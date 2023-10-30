<template>
  <div class="home">
    <TaskForm />
    <GetTasks />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskForm from '../components/home/TaskForm.vue';
import GetTasks from '../components/home/GetTasks.vue';

export default {
    name: 'HomeView',
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters({
            'user': 'auth/user'
        })
    },
    mounted() {
    },
    components: { TaskForm, GetTasks }
};
</script>

<style lang="scss" scoped>
.home{
    width: 90%;
    max-width: 600px;    
    margin: 0 auto;
    padding: 20px 0;
}
</style>