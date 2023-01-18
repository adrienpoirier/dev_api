<template>
  <div >
    <navbar-component @menu="ongletMenu" :menu="menu" :connection="connection" @logout="logout"></navbar-component>
    <div>
      <login-component v-if="menu === 'login'" @menu="ongletMenu"></login-component>
      <register-component v-if="menu === 'register'" @menu="ongletMenu"></register-component>
    </div>
    <div v-if="menu === 'home'" class="flex justify-center align-center flex-col">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Bienvenue !</h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Ici vous pourrez découvrir une diverssitée de fonctionnalité visant à gérer vos listes de courses ou vos tâches.</p>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Pour utiliser pleinement notre applications veuillez soit a créer un compte soit à vous connecter</p>
    </div>
    <tasks-components v-if="menu === 'list'"></tasks-components>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import {getLocalStorageVariable} from "@/assets/js/localStorage";
import TasksComponents from "@/components/TasksComponents.vue";
export default {
  name: 'App',
  computed: {
  },
  data:() => ({
    menu: 'home',
    connection: false
  }),
  components: {
    TasksComponents,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  },
  methods: {
    ongletMenu(value) {
      this.menu = value
      if(getLocalStorageVariable('token') !== null) {
        this.connection = true
      }
    },
    logout(){
      this.menu = 'home'
      this.connection = false
    }
  },
  mounted() {
    if(getLocalStorageVariable('token') !== null) {
      this.connection = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
