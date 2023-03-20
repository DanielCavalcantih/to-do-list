<template>
  <div class="task">
    <div class="header-description">
      <header>
        <div class="status-color" :class="task.status"></div>
        <h3>{{ task.title }}</h3>
      </header>
      <p class="description">{{ task.description }}</p>
      <div class="status-date">
        <span :class="task.status">{{ task.status }}</span>
        <span>{{ formatedDate }}</span>
      </div>
    </div>
    <div class="button-delete-edit">
      <button type="button" @click="handleClickDelete">
        <img src="../assets/white-trash.png" alt="" width="18px" v-if="darkMode">
        <img src="../assets/black-trash.png" alt="" width="18px" v-else="darkMode">
      </button>
      <button type="button" @click="showUpdateForm = true">
        <img src="../assets/pencil.png" alt="" width="18px" v-if="darkMode">
        <img src="../assets/black-pencil .png" alt="" width="18px" v-else="darkMode">
      </button>
    </div>
    <ModalUpdate v-if="showUpdateForm" :task="task" :backgroundMode="backgroundMode" :cancelUpdate="handleClickCancel" :updateTasks="updateTasks" :handleClickCancel="handleClickCancel" />
  </div>
</template>

<script>
  import formatDate from '@/services/formatDate';
  import { deleteTask } from '@/services/api';
  import ModalUpdate from '@/components/FormUpdate.vue';

  export default {
    name: 'TaskCard',
    props: ['task', 'darkMode', 'updateTasks', 'backgroundMode'],
    data() {
      return {
        showUpdateForm: false,
      }
    },
    components: {
      ModalUpdate
    },
    methods: {
      async handleClickDelete() {
        await deleteTask(this.task.id);
        await this.updateTasks();
      },
      handleClickCancel() {
        this.showUpdateForm = false;
      }
    },
    computed: {
      formatedDate() {
        return formatDate(this.task.created);
      }
    }
  }
</script>

<style>
  .task {
    display: flex;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 5px black;
    cursor: grab;
  }

  .task:active {
    cursor: grabbing;
  }

  header {
    display: flex;
    align-items: center;
  }

  .header-description {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
  }

  .status-color {
    width: 27px;
    height: 8px;
    border-radius: 5px;
  }

  .task h3 {
    margin: 0;
    font-size: 16px;
    margin-left: 15px;
  }

  .description {
    font-size: 14px;
    margin:10px 0 10px;
  }

  .status-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  .status-date span:first-child {
    border-radius: 5px;
    padding: 2px 10px;
  }

  .Pending {
    background-color: grey;
  }

  .In-progress {
    background-color: rgb(160, 160, 66);
  }

  .Finished {
    background-color: rgb(63, 165, 63);
  }

  .button-delete-edit {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .button-delete-edit button {
    background: none;
    border: none;
    height: 50%;
    padding: 0 6px;
    cursor: pointer;
    transition: 250ms;
  }

  .button-delete-edit button:first-child {
    border-radius: 0 10px 0 0;
  }

  .button-delete-edit button:last-child {
    border-radius: 0 0 10px 0;
  }

  .button-delete-edit button:hover {
    background-color: rgba(128, 128, 128, 0.37);
  }
</style>