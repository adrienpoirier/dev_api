<template>
  <div class="rectangle">
    <input v-model="list.title" class="title">
    <hr>
    <ul>
      <li class="left" v-for="task in tasks" :key="task.id">
        <div class="row" v-if="task.list === list._id">
          <div class="square"></div>
          <input v-model="task.title" type="text">
        </div>

      </li>
      <li class="left" v-for="task in add_list" :key="task.id">
        <div class="row">
          <div class="square"></div>
          <input v-model="task.title" type="text">
        </div>
      </li>

    </ul>
    <div class="row-add-task">
      <div class="add-list-mini" v-on:click="addNewTask()">+</div>
      <div class="remove-list-mini" v-on:click="removeTask()">-</div>
    </div>
    <div class="validate" v-on:click="validate">✔</div>
  </div>



</template>

<script>
import {store} from "@/store";
import {getLocalStorageVariable} from "@/assets/js/localStorage";

export default {
  name: "EditListItemComponent",
  props: ["list", "tasks"],
  data:() => ({
    add_list: []

  }),
  methods: {
    addNewTask() {
      this.add_list.push({title:''})
    },
    removeTask() {
      this.add_list.pop()
    },
    async validate(){
      // await store.dispatch("updateList",)
      for (const task in this.tasks.filter(task => task.list === this.list._id)) {
        const updateTask = this.tasks.filter(task => task.list === this.list._id)[task]
        await store.dispatch("updateTask", {token: getLocalStorageVariable('token'), title: updateTask.title, id: updateTask._id })

      }
      for (const task in this.add_list){
        await store.dispatch("createTask", {token: getLocalStorageVariable('token'), listId: await this.list._id, task:this.add_list[task]})
      }
      await store.dispatch("updateList",{token: getLocalStorageVariable('token'), title: await this.list.title, id: this.list._id})
      this.$emit('updateElement')
    },
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>