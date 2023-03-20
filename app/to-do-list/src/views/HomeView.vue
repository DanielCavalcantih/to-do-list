<template>
  <main :class="backgroundMode.color1">
    <Header :changeBackgroundMode="changeBackgroundMode" :darkMode="darkMode" />
    <FormTask :updateTasks="updateTasks" :darkMode="darkMode" :backgroundMode="backgroundMode" />
    <div class="container-tasks">
      <section class="tasks" :class="backgroundMode.color2">
        <h2 class="Pending">Pending</h2>
        <div class="div-scroll">
          <p class="no-tasks" v-if="!columns.pendingTasks.length && showMessage">Nenhuma tarefa pendente</p>
          <Container
            v-else
            style="min-height: 80px;"
            group-name="column"
            @drag-start="handleDragStart('pendingTasks', $event)"
            @drop="handleDrop('pendingTasks', $event)"
            :get-child-payload="getChildPayload"
          >
            <Draggable v-for="task in columns.pendingTasks">
              <TaskCard :class="backgroundMode.color3" :task="task" :darkMode="darkMode" :updateTasks="updateTasks" :backgroundMode="backgroundMode"/>
            </Draggable>
          </Container>
        </div>
      </section>
      <section class="tasks" :class="backgroundMode.color2">
        <h2 class="In-progress">In progress</h2>
        <div class="div-scroll">
          <p class="no-tasks" v-if="!columns.inProgressTasks.length && showMessage">Nenhuma tarefa em progresso</p>
          <Container
            v-else
            style="min-height: 80px;"
            group-name="column"
            @drag-start="handleDragStart('inProgressTasks', $event)"
            @drop="handleDrop('inProgressTasks', $event)"
            :get-child-payload="getChildPayload"
          >
            <Draggable v-for="task in columns.inProgressTasks">
              <TaskCard :class="backgroundMode.color3" :task="task" :darkMode="darkMode" :updateTasks="updateTasks" :backgroundMode="backgroundMode"/>
            </Draggable>
          </Container>
        </div>
      </section>
      <section class="tasks" :class="backgroundMode.color2">
        <h2 class="Finished">Finished</h2>
        <div class="div-scroll">
          <p class="no-tasks" v-if="!columns.finishedTasks.length && showMessage">Nenhuma tarefa finalizada</p>
          <Container
            v-else
            style="min-height: 80px;"
            group-name="column"
            @drag-start="handleDragStart('finishedTasks', $event)"
            @drop="handleDrop('finishedTasks', $event)"
            :get-child-payload="getChildPayload"
          >
            <Draggable v-for="task in columns.finishedTasks">
              <TaskCard :class="backgroundMode.color3" :task="task" :darkMode="darkMode" :updateTasks="updateTasks" :backgroundMode="backgroundMode"/>
            </Draggable>
          </Container>
        </div>
      </section>
    </div>
    <button class="logout" type="button" @click="handleClickLogout">Sair<img src="../assets/logout.png" alt="" width="18"></button>
  </main>
</template>

<script>
  import router from '@/router';
  import { getTasks, getUser, changeMode, changeTaskStatus } from '@/services/api';
  import Header from '@/components/Header.vue';
  import TaskCard from '@/components/TaskCard.vue';
  import FormTask from '@/components/FormTask.vue';
  import { Container, Draggable } from 'vue-smooth-dnd';

  export default {
    name: 'HomeView',
    components: {
      Header,
      TaskCard,
      FormTask,
      Container,
      Draggable,
    },
    data() {
      return {
        columns: {
          pendingTasks: [],
          inProgressTasks: [],
          finishedTasks: [],
        },
        darkMode: null,
        draggingCard: {
          column: '',
          index: -1,
          cardData: {},
        },
        showMessage: true,
      };
    },
    computed: {
      backgroundMode() {
        return {
          color1: { darkMode: this.darkMode, whiteMode: !this.darkMode },
          color2: { darkMode2: this.darkMode, whiteMode2: !this.darkMode },
          color3: { darkMode3: this.darkMode, whiteMode3: !this.darkMode },
        };
      },
    },
    async mounted() {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');
      else {
        const { dark_mode } = await getUser();
        this.darkMode = dark_mode;
        const allTasks = await getTasks();
        allTasks.map(task => {
          if (task.status === 'Pending') return this.columns.pendingTasks = [...this.columns.pendingTasks, task];
          if (task.status === 'In-progress') return this.columns.inProgressTasks = [...this.columns.inProgressTasks, task];
          return this.columns.finishedTasks = [...this.columns.finishedTasks, task];
        });
      }
    },
    methods: {
      async changeBackgroundMode() {
        const { dark_mode } = await changeMode();
        this.darkMode = dark_mode;
      },
      async updateTasks() {
        const allTasks = await getTasks();
        this.columns.pendingTasks = [];
        this.columns.inProgressTasks = [];
        this.columns.finishedTasks = [];
        allTasks.map(task => {
          if (task.status === 'Pending') return this.columns.pendingTasks = [...this.columns.pendingTasks, task];
          if (task.status === 'In-progress') return this.columns.inProgressTasks = [...this.columns.inProgressTasks, task];
          return this.columns.finishedTasks = [...this.columns.finishedTasks, task];
        });
      },
      handleDragStart(column, dragResult) {
        this.showMessage = false;
        const { payload, isSource } = dragResult;
        if (isSource) {
          this.draggingCard = {
            column,
            index: payload.index,
            cardData: this.columns[column][payload.index],
          }
        }
      },
      async handleDrop(column, dropResult) {
        this.showMessage = true;
        const { removedIndex, addedIndex } = dropResult;
        const removedCard = this.columns[column][removedIndex];
        const addedCard = this.columns[column][addedIndex];
        if (column === this.draggingCard.column || removedIndex === addedIndex) return;
        if (column === 'pendingTasks') {
          await changeTaskStatus(this.draggingCard.cardData.id, 'Pending');
          return await this.updateTasks();
        }
        if (column === 'inProgressTasks') {
          await changeTaskStatus(this.draggingCard.cardData.id, 'In-progress');
          return await this.updateTasks();
        }
        if (column === 'finishedTasks') {
          await changeTaskStatus(this.draggingCard.cardData.id, 'Finished');
          return await this.updateTasks();
        }
      },
      getChildPayload(index) {
        return {
          index,
        };
      },
      handleClickLogout() {
        localStorage.removeItem('token');
        router.push('/login');
      },
    }
  }
</script>

<style>
  main {
    height: 100vh;
  }

  .container-tasks {
    display: flex;
    justify-content: space-evenly;
  }

  .tasks {
    width: 25%;
    border-radius: 10px;
    height: fit-content;
    transition: 300ms;
  }

  .tasks h2 {
    margin: 0;
    padding: 5px 0;
    border-radius: 10px 10px 0 0;
    text-align: center;
    font-size: 20px;
    color: white;
  }

  .div-scroll {
    max-height: 430px;
    overflow: hidden;
    overflow-y: auto;
    transition: 300ms;
  }

  .div-scroll::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
  }

  .div-scroll::-webkit-scrollbar-thumb {
    background-color: #373e47;
    border-radius: 10px;
  }

  .darkMode {
    background-color: #22272E;
    color: white;
    transition: 200ms;
  }

  .whiteMode {
    transition: 200ms;
  }

  .darkMode2 {
    background-color: #31323A;
    color: white;
    transition: 200ms;
  }

  .whiteMode2 {
    transition: 200ms;
    background-color: rgb(233, 233, 255);
    color: black;
  }

  .darkMode3 {
    background-color: #373e47;
    transition: 200ms;
  }

  .whiteMode3 {
    transition: 200ms;
    background-color: rgb(236, 236, 236);
  }

  .no-tasks {
    text-align: center;
    font-weight: bold;
    margin: 10px 0;
  }

  .logout {
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 20px;
    right: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    background-color: gray;
    color: white;
    cursor: pointer;
    transition: 200ms;
  }

  .logout:hover {
    background-color: rgb(150, 150, 150);
  }

  .logout img {
    margin-left: 8px;
  }
</style>
