<template>
  <div class="container-add-task">
    <button class="button-add-task" v-if="!addTask" type="button" @click="addTask = !addTask">+ Tarefa</button>
    <div class="modal" v-if="addTask">
      <form class="add-task" :class="backgroundMode.color1">
        <div class="title-cancel">
          <input maxlength="30" placeholder="Título da tarefa" type="text" v-model="taskInfo.title" :class="backgroundMode.color2">
          <button class="button-cancel" type="button" @click="handleClickCancel">x</button>
        </div>
        <textarea :maxlength="150" placeholder="Descrição" rows="5" type="text" v-model="taskInfo.description" :class="backgroundMode.color2" />
        <button class="add-task-button" type="button" @click="handleClick">Adicionar tarefa</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { insertTask } from '@/services/api';

  export default {
    name: 'FormTask',
    props: ['updateTasks', 'backgroundMode'],
    data() {
      return {
        taskInfo: {},
        addTask: false,
      }
    },
    methods: {
      async handleClick() {
        await insertTask(this.taskInfo);
        this.taskInfo = {};
        await this.updateTasks();
        this.addTask = false;
      },
      handleClickCancel() {
        this.taskInfo = {};
        this.addTask = false;
      }
    }
  }
</script>

<style>
  .container-add-task {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    height: 30px;
  }

  .button-add-task {
    background-color: green;
    border: none;
    padding: 5px 12px;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 200ms;
  }

  .button-add-task:hover {
    background-color: rgb(0, 141, 0);
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5;
    cursor: default;
  }

  .add-task {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 250px;
    width: 500px;
    padding: 30px 30px 0;
    border-radius: 10px;
    background-color: white;
  }

  .add-task input {
    padding: 5px 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
  }

  .add-task input:focus {
    outline: none;
  }

  .add-task textarea {
    font-size: 16px;
    width: 95%;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    resize: none;
    padding: 10px;
  }

  .add-task textarea:focus {
    outline: none;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .button-cancel {
    font-size: 18px;
    width: 30px;
    border: none;
    background-color: rgb(133, 0, 0);
    color: white;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    transition: 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-cancel:hover {
    background-color: red;
  }

  .add-task-button {
    border: none;
    font-size: 18px;
    border-radius: 5px;
    background-color: rgb(0, 104, 0);
    cursor: pointer;
    color: white;
    transition: 200ms;
    padding: 7px 13px;
    margin: 20px 0;
  }

  .add-task-button:hover {
    background-color: rgb(0, 121, 0);
  }

  .title-cancel {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
</style>