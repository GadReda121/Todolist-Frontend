<template>
    <div class="parentTask mt-3">
        <div v-for="(task, index) in tasks" :key="task.id" class="task d-flex align-items-center gap-3">
            <h6>
                <span>{{ index + 1 }}</span>
            </h6>
            <h3>{{ task.title }}</h3>
            <small>{{ task.date.split("T")[0] }}</small>
        </div>
        <div v-if="tasks.length == 0">No Tasks Founded</div>
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
    .task{
        background-color: var(--accent-100);
        padding: 15px 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        h6{
            margin: 0;
            height: 40px;
            width: 40px;
            background-color: var(--text-200);
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                color: var(--accent-100);
                font-weight: 600;
            }
        }
        h3{
            color: var(--text-100);
            font-weight: 600;
            margin: 0;
        }
    }
}
</style>