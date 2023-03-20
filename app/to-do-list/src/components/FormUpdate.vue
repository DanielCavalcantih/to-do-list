<template>
  <div class="modal">
    <form class="add-task" :class="backgroundMode.color1">
      <div class="title-cancel">
        <input maxlength="30" type="text" v-model="taskInfo.title" :class="backgroundMode.color2">
        <button class="button-cancel" type="button" @click="cancelUpdate">x</button>
      </div>
      <textarea :maxlength="150" rows="5" type="text" v-model="taskInfo.description" :class="backgroundMode.color2" />
      <button class="add-task-button" type="button" @click="handleClick">Atualizar tarefa</button>
    </form>
  </div>
</template>

<script>
  import { updateTask } from '@/services/api';

  export default {
    name: 'ModalUpdate',
    props: ['task', 'backgroundMode', 'cancelUpdate', 'updateTasks', 'handleClickCancel'],
    data() {
      return {
        taskInfo: {
          title: this.task.title,
          description: this.task.description,
        },
      }
    },
    methods: {
      async handleClick() {
        await updateTask(this.task.id, this.taskInfo);
        await this.updateTasks();
        this.handleClickCancel();
      },
    }
  }
</script>