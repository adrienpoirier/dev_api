<template>
  <edit-list-item-component v-if="edit" :list="list" :tasks="tasks" @updateElement="updateElement"></edit-list-item-component>
  <div class="rectangle" v-if="!edit" :style="[!this.background ? '--background-color:#fdfd96' : '--background-color:#F89C9CFF']">
    <span class="title">{{list.title}}</span>
    <hr>
    <ul>
      <li class="left" v-for="task in tasks" :key="task.id">

        <div class="row" v-if="task.list === list._id">
          <div class="square"></div>
          {{task.title}}
        </div>
      </li>
    </ul>
    <div class="delete" v-on:click="deleteElement(list._id)">🗑</div>
    <div class="edit" v-on:click="editElement">✎</div>
    <span class="id">{{list._id}}</span>
  </div>
</template>

<script>
import EditListItemComponent from "@/components/EditListItemComponent.vue";

export default {
  name: "ListItemComponent",
  components: {EditListItemComponent},
  props: ["list", "tasks"],
  data:() => ({
    background: false,
    edit : false,
  }),
  methods: {
    deleteElement(id){
      this.background = !this.background
      this.$emit('addDeletingElement', id)
    },
    editElement() {
      this.edit = true
    },
    updateElement() {
      this.edit = false
      this.$emit("updateElement")
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.delete {
  position: absolute;
  display: flex;
  background: #e34848;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin:270px 266px 0 0;
}

.delete:hover {
  background: #ea3434;
}

.edit {
  position: absolute;
  display: flex;
  background: #7575ec;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin:270px 210px 0 0;
}

.edit:hover {
  background: #6363c1;
}
</style>