<template>
  <section>
    <div class="container-form-p">
      <h1 v-if="pathName === '/login'">Entrar</h1>
      <h1 v-else>Registrar</h1>
      <form>
        <label for="name" v-if="pathName === '/register'">
          <img src="../assets/user.png" width="18" alt=""><input id="name" placeholder="Nome" type="text" v-model="userInfo.name">
        </label>
        <label for="email">
          <img src="../assets/mail.png" width="20" alt=""><input id="email" placeholder="E-mail" type="email" v-model="userInfo.email">
        </label>
        <label for="pass">
          <img src="../assets/padlock.png" width="20" alt=""><input id="pass" placeholder="Senha (min 8 caractéres)" type="password" v-model="userInfo.password">
        </label>
        <button v-if="pathName === '/login'" type="button" @click="handleClick">Entrar</button>
        <button v-else type="button" @click="handleClickRegister">Registrar</button>
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </form>
      <div>
        <p v-if="pathName === '/login'">Ainda não tem uma conta? <router-link to="/register">Registre-se</router-link></p>
        <p v-else>Já tem uma conta? <router-link to="/login">Fazer login</router-link></p>
      </div>
    </div>
  </section>
</template>

<script>
  import router from '@/router';
  import { login, register } from '@/services/api';

  export default {
    name: "FormLogin",
    data() {
      return {
        userInfo: {},
        errorMessage: null,
      };
    },
    computed: {
      pathName() {
        this.userInfo = {};
        this.errorMessage = null;
        return this.$route.path;
      }
    },
    methods: {
      async handleClick() {
        try {
          await login(this.userInfo);
        }
        catch (error) {
          this.errorMessage = error.response.data.message;
        }
      },
      async handleClickRegister() {
        try {
          await register(this.userInfo);
          alert('Registrado com sucesso!');
          router.push('/login');
        } catch (error) {
          this.errorMessage = error.response.data.message;
        }
      },
    }
  }
</script>

<style scoped>
  section {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    background-image: url('https://images.alphacoders.com/938/938243.jpg');
    background-size: cover;
    color: white;
  }

  h1 {
    font-family: 'Caveat', cursive;
    font-size: 35px;
  }
  .container-form-p {
    border: solid 2px rgba(255, 255, 255, 0.555);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    height: 400px;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.178);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.212);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 230px;
  }

  label {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 10px;
  }

  input {
    font-size: 16px;
    padding: 5px 0 5px 10px;
    border: solid 1px white;
    border-width: 0 0 1px 0;
    background: none;
    color: white;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.486);
  }

  input:focus {
    outline: none;
  }

  button {
    background: none;
    border: solid 1px white;
    padding: 5px 30px;
    font-size: 18px;
    border-radius: 50px;
    margin-top: 20px;
    color: white;
    cursor: pointer;
    transition: 100ms;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.082);
  }

  p {
    font-weight: bold;
  }

  a {
    color: white;
  }
</style>