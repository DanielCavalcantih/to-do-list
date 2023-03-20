<template>
  <header>
    <h1>My Tasks</h1>
    <h2>{{ userName }}</h2>
    <div class="container-button">
      <button class="button-mode" type="button" @click="changeBackgroundMode">
        <div class="circle" :class="{ enable: darkMode, disable: !darkMode }">
          <img v-if="darkMode" src="../assets/moon.png" alt="" width="16px">
          <img v-else src="../assets/sun.png" alt="" width="16px">
        </div>
      </button>
    </div>
  </header>
</template>

<script>
  import { getUser } from '@/services/api';

  export default {
    name: 'Header',
    props: ['changeBackgroundMode', 'darkMode'],
    data() {
      return {
        userName: null,
      }
    },
    async mounted() {
      const token = localStorage.getItem('token');
      if (token) {
        const { name } = await getUser();
        this.userName = name;
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    margin-bottom: 20px;
  }

  header h1 {
    width: 25%;
    margin: 0;
    font-family: 'Caveat', cursive;
    font-size: 50px;
  }

  header h2 {
    width: 25%;
    text-align: center;
  }

  .container-button {
    width: 25%;
    display: flex;
    justify-content: flex-end;
  }

  .button-mode {
    width: 50px;
    border: none;
    border-radius: 50px;
    background-color: grey;
    cursor: pointer;
  }

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: rgb(173, 173, 173);
    transition: 100ms;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle img {
    transition: 100ms;
  }

  .enable {
    margin-left: 17.5px;
  }

  .disable {
    margin-left: -5px;
  }
</style>