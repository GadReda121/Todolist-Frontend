<template>
  <form @submit.prevent="submit">
    <input type="text" v-model="state.form.title" placeholder="Add Task..." />
    <button type="submit">Add</button>
  </form>
  <small v-if="v$.form.title.$error" class="text-light">
    {{ v$.form.title.$errors[0].$message }}
  </small>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import axios from 'axios';
import toast from "../utils/toast";

export default {
  name: "TaskForm",
  data() {
    return {};
  },
  setup() {
    const state = reactive({
      form: {
        title: "",
      },
    });
    const rules = computed(() => {
      return {
        form: {
          title: [required, minLength(3)],
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    return { rules, state, v$ };
  },
  methods: {
    async submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await axios.post('/tasks', this.state.form)
        .then((response) => {
            if(response.status == 201){
              toast.success('Task added successfully');
              this.state.form.title = '';
              this.$store.state.tasks.data.push(response.data.data.task);
            }
        })
        .catch((error) => {
            console.log(error);
        });
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  input {
    padding: 10px;
    width: 100%;
    height: 50px;
    border-radius: 5px 0 0 5px;
  }
  button {
    width: 100px;
    height: 50px;
    border-radius: 0 5px 5px 0;
    background-color: var(--accent-100);
    font-weight: 600;
    color: var(--text-100);
  }
}
</style>
