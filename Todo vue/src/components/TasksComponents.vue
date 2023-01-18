<template>
  <div class="buttons">
    <div class="add-list" v-on:click="addNewList">+</div>
    <div class="remove-list" v-on:click="removeList">-</div>
    <div class="validate" v-on:click="validate">✔</div>
  </div>
  <div class="display-wrap">
    <div v-for="list in lists">
      <list-item-component :list="list" :tasks="tasks" @addDeletingElement="deleteElement" @updateElement="updateElement"></list-item-component>
    </div>
      <div class="rectangle" v-for="(list,index) in add_list" :key="list._id">
        <input v-model="list.title" class="title">
        <hr>
        <ul>
          <li class="left" v-for="task in list.tasks" :key="task.id">
            <div class="row">
              <div class="square"></div>
              <input v-model="task.title" type="text">
            </div>
          </li>

        </ul>
        <div class="row-add-task">
          <div class="add-list-mini" v-on:click="addNewTask(index)">+</div>
          <div class="remove-list-mini" v-on:click="removeTask(index)">-</div>
        </div>

      </div>


  </div>

</template>

<script>
import {store} from "@/store";
import {getLocalStorageVariable} from "@/assets/js/localStorage";
import ListItemComponent from "@/components/ListItemComponent.vue";
import EditListItemComponent from "@/components/EditListItemComponent.vue";
export default {
  name: "TasksComponents",
  components: {EditListItemComponent, ListItemComponent},
  data:() => ({
    lists : [],
    tasks : [],
    add_list: [],
    tasksList: [],
    deleteItems: [],
  }),
  methods: {
    addNewList() {
      this.add_list.push({title:'', tasks: [{title:''}]})
    },
    removeList() {
      this.add_list.pop()
    },

    addNewTask(index) {
      this.add_list[index].tasks.push({title:''})
    },
    removeTask(index) {
      this.add_list[index].tasks.pop()
    },

    deleteElement(id) {
      if (this.deleteItems.includes(id)) {
        this.deleteItems = this.deleteItems.filter(item => item !== id);
      } else {
        this.deleteItems.push(id)
      }
    },
    async updateElement(){
      await store.dispatch('loadTodos', getLocalStorageVariable('token'))
      await store.dispatch('loadTasks', getLocalStorageVariable('token'))

      this.lists = await store.getters.getTodos
      this.tasks = await store.getters.getTasks
    },

    async validate(){

      if(this.deleteItems.length > 0) {
        for (const id in this.deleteItems) {
          await store.dispatch("deleteList", {token: getLocalStorageVariable('token'), id: this.deleteItems[id]})
        }

      }

      for (const list in this.add_list) {

        await store.dispatch("createList", {token: getLocalStorageVariable('token'), list:this.add_list[list]})
        const listid = await store.getters.getList;

        for(const task in this.add_list[list].tasks) {
          await store.dispatch("createTask", {token: getLocalStorageVariable('token'), listId: await listid._id, task:this.add_list[list].tasks[task]})
        }
      }

      await store.dispatch('loadTodos', getLocalStorageVariable('token'))
      await store.dispatch('loadTasks', getLocalStorageVariable('token'))

      this.lists = await store.getters.getTodos
      this.tasks = await store.getters.getTasks

      this.add_list = []
      this.deleteItems = []
    }

  },
  async mounted() {
    await store.dispatch('loadTodos', getLocalStorageVariable('token'))
    await store.dispatch('loadTasks', getLocalStorageVariable('token'))

    this.lists = await store.getters.getTodos
    this.tasks = await store.getters.getTasks
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Source+Code+Pro:wght@500&display=swap');
:root {
  --background-color: #fdfd96
}

.display-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.buttons {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 10;
  top: 290px;
  left: 95%;
}

.row-add-task {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.add-list {
  display: flex;
  background: #7575ec;
  width: 50px;
  height: 50px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.add-list:hover {
  background: #6363c1;
}


.validate:hover {
  background: #239e3a;
}

.validate {
  display: flex;
  background: #2dd04c;
  width: 50px;
  height: 50px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
}

.remove-list {
  display: flex;
  background: #e34848;
  width: 50px;
  height: 50px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top : 10px;
}

.remove-list:hover {
  background: #ea3434;
}

.add-list-mini {
  display: flex;
  background: #7575ec;
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-list-mini:hover {
  background: #6363c1;
}

.remove-list-mini {
  display: flex;
  background: #e34848;
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left : 10px;
}

.remove-list-mini:hover {
  background: #ea3434;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

.square {
  content: "";
  width: 5px;
  height: 5px;
  background: black;
  margin-right: 5px;
  margin-top: 5px;
}

.left{
  text-align: start;
  margin-top: 4px;
  font-family: 'Dancing Script', cursive;
  font-size: 1.2em;
}

.rectangle {
  display: flex;
  width: 300px;
  height: 300px;
  background: var(--background-color);
  margin: 20px;
  align-items: center;
  flex-direction: column;
}

.rectangle .title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5em;
  margin:8px 0;
}

.rectangle .id {
  position: absolute;
  font-family: 'Dancing Script', cursive;
  font-size: 0.8em;
  margin:280px 0 0 140px;
}

.rectangle hr {
  display: flex;
  width: 250px;
  color: black;
}
</style>
