<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create and account
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
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input v-model="user.terms_and_conditions" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
              </div>
            </div>
            <button v-on:click="verifyRegister" type="button" class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
<!--            <p class="text-sm font-light text-gray-500 dark:text-gray-400">-->
<!--              Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>-->
<!--            </p>-->
          </form>
        </div>
      </div>
    </div>
  </section>
  {{user}}
</template>

<script>
import {store} from "@/store";
import {createLocalStorageVariable} from "@/assets/js/localStorage";
import _ from "lodash";

export default {
  name: "RegisterComponent",
  data: () => ({
    user : {email:"", password: "", terms_and_conditions: false},
    confirmPassword : "",
    error : "",
    errorBool : false
  }),
  methods: {
    async verifyRegister(){
      if(this.user.email !== "" && this.user.password !== "" && this.user.terms_and_conditions === true && this.confirmPassword !== "") {
        if (this.user.password === this.confirmPassword) {
          await store.dispatch('register', this.user)
            createLocalStorageVariable('token', _.get(await store.getters.getToken, 'message'))
            this.$emit('menu', 'home')
        }  else {
          this.errorBool = true
          this.error = "Les mots de passes ne correspondent pas "
          setTimeout(() => {this.errorBool = false}, 2000)
        }
      } else {
        this.errorBool = true
        this.error = "Veuillez remplir tout les champs et accepter la CGU"
        setTimeout(() => {this.errorBool = false}, 2000)

      }
    }
  },
}
</script>

<style scoped>

</style>