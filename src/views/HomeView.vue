<template>
  <div class="home">
    <div class="PostTask">
        <TaskForm />
    </div>
    <div class="allTasks">
        <GetTasks />
    </div>
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
    .PostTask{
        width: 90%;
        max-width: 600px;    
        margin: 0 auto;
        padding: 30px 0;
    }
    .allTasks{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        margin: 0 20px;
        // media
        @media (max-width: 800px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>