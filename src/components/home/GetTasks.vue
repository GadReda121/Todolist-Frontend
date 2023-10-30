<template>
    <div class="parentTask mt-3">
        <h5 class="text-center">To Do</h5>
        <div class="task" v-for="task in tasks" :key="task.id">
            <h3 v-if="tasks.length > 0">{{ task.title }}</h3>
            <h3 v-else>Please, Add Something</h3>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GetTasks',
    data(){
        return {
            tasks: []
        }
    },
    methods: {
        async getTask(){
            await axios.get('/tasks')
            .then((response) => {
                this.$store.state.tasks.data = response.data.data.tasks;
                this.tasks = this.$store.state.tasks.data;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    mounted() {
        this.getTask();
    },
}
</script>

<style lang="scss" scoped>
.parentTask{
    background-color: var(--bg-200);
    border-radius: 5px;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px; 
    h5{
        background-color: var(--bg-100);
        color: var(--text-100);
        padding: 20px;
        border-radius: 5px;
        margin: 0;
    }   
    .task{
        background-color: var(--bg-300);
        padding: 20px;
        border-radius: 5px;
        h3{
            color: var(--text-100);
            font-weight: 600;
            margin: 0;
            font-size: 1rem;
        }
    }
}
</style>