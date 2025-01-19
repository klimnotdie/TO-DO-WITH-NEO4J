<template>
  <div id="app">
    <div class="main">
      <h1>TODO List</h1>

      <form @submit.prevent="addTask">
        <input v-model="newTask" placeholder="New Task" />
        <button class="button button-add" type="submit">Добавить</button>
      </form>
      <ul>
        <li class="list-item" v-for="task in tasks" :key="task.id">
          <span class="item-title" :class="{ done: task.status === 'done' }">{{ task.title }}</span>
          <button class="button button-edit " @click=" toggleStatus(task)">{{ task.status }}</button>
          <button class="button button-delete " @click="deleteTask(task.id)">Удалить</button>
        </li>
      </ul>
      <div v-if="errors.length">
        <pre>{{ errors }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUri = 'http://localhost:3009/api/tasks'
export default {
  data() {
    return {
      tasks: [],
      newTask: "",
      errors: []
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get(baseUri);
        if (response?.code === 500) throw new Error(response)
        this.tasks = response.data;
      } catch (error) {
        this.errors.push(error)
        console.error("Failed to add task:", error);
      }
    },
    async addTask() {
      try {
        if (!this.newTask) {
          this.errors.push('Tittle required')
          return
        }
        const response = await axios.post(baseUri, {
          title: this.newTask,
        });
        if (response?.code === 500) throw new Error(response)
        this.tasks.push(response.data);
        this.newTask = "";
      } catch (error) {
        this.errors.push(error)
        console.error("Failed to add task:", error);
      }
    },
    async toggleStatus(task) {
      try {
        const newStatus = task.status === "progress" ? "done" : "progress";
        await axios.put(`${baseUri}/${task.id}`, {
          status: newStatus,
        });
        task.status = newStatus;
      } catch (error) {
        this.errors.push(error)
        console.error("Failed to add task:", error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`${baseUri}/${id}`);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        this.errors.push(error)
        console.error("Failed to add task:", error);
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style>
form h1 {
  margin-left: 45px;
}

.main {
  margin: 0 auto;
  width: 620px;
}

.item-title {
  max-width: 120px;
}

.button {
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 6px;
  list-style: none;
  margin: 0;
  padding: 8px 10px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-add {
  background-color: rgb(89 224 36 / 20%) !important;
}

.button-delete {
  background-color: rgba(224, 89, 36, 0.2) !important;
}

.button-edit {
  background-color: rgba(9, 29, 254, 0.2) !important;
}

.button-group {
  float: left;
}

li {
  margin-bottom: 10px;
  list-style-type: none;
  /* Убираем маркеры */
}

.list-item {
  text-align: left;
}

ul {
  margin-left: -40px;
}

.done {
  text-decoration: line-through;
}
</style>