<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <div v-on:click="ongletMenu('home')" :class="[menu === 'home' ? 'text-blue-700' : 'text-gray-700']" class="cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">Home</div>
          </li>
          <li v-if="!connection">
            <div v-on:click="ongletMenu('register')" :class="[menu === 'register' ? 'text-blue-700' : 'text-gray-700']" class="cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</div>
          </li>
          <li v-if="!connection">
            <div  v-on:click="ongletMenu('login')" :class="[menu === 'login' ? 'text-blue-700' : 'text-gray-700']" class="cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</div>
          </li>
          <li v-if="connection">
            <div  v-on:click="ongletMenu('list')" :class="[menu === 'list' ? 'text-blue-700' : 'text-gray-700']" class="cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Liste</div>
          </li>
          <li v-if="connection">
            <div v-on:click="logout" class="cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {removeLocalStorageVariable} from "@/assets/js/localStorage";

export default {
  name: "NavbarComponent",
  props: ['menu', 'connection'],
  data : () =>({
  }),
  methods : {
    ongletMenu(value){
      this.$emit('menu', value)
    },
    logout(){
      removeLocalStorageVariable('token')
      this.$emit('logout', 'home')
    }
  },
  mounted() {
    console.log(this.connection)
  }
}
</script>

<style scoped>

</style>