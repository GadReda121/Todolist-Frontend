<template>
  <div>
    <h1>Home</h1>
    <mark>{{ user.email }}</mark>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'HomeView',
  data(){
    return {
      tasks: []
    }
  },
  computed:{
    ...mapGetters({
      'user': 'auth/user'
    })
  },
  mounted(){
    axios.get('/tasks')
      .then(response => {
        this.tasks = response.data.data.tasks;
      })
      .catch(error => console.log(error.response.data));
  }
};
</script>