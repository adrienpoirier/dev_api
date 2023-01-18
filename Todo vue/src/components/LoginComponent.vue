<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <div v-if="errorBool" class="mb-6 w-full text-white bg-red-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600">{{error}}</div>
          <form class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="user.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="user.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>
            <button v-on:click="verifyLogin" type="button" class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
<!--            <p class="text-sm font-light text-gray-500 dark:text-gray-400">-->
<!--              Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>-->
<!--            </p>-->
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import {store} from "@/store";
import {createLocalStorageVariable, removeLocalStorageVariable} from "@/assets/js/localStorage";

export default {
  name: "LoginComponent",
  computed: {
  },
  data:() => ({
    user: {email:"", password: ""},
    errorBool : false,
    error : ""
  }),
  components: {
  },
  methods: {
    async verifyLogin(){
      if(this.user.email !== "" && this.user.password !== "") {
        await store.dispatch('login', this.user)
        removeLocalStorageVariable('token')
        createLocalStorageVariable('token', _.get(await store.getters.getToken, 'message'))
        this.$emit('menu', 'home')
      } else {
        this.errorBool = true
        this.error = "Veuillez remplir tout les champs"
        setTimeout(() => {this.errorBool = false}, 2000)
      }
    }
  },
   mounted() {
  }
}
</script>

<style scoped>

</style>