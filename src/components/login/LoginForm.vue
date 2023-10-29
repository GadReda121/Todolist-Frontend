<template>
    <div class="contact">
        <form @submit.prevent="LogIn">
            <h3 class="mb-4 fs-1 text-center">LOG IN</h3>
            <div class="child">
                <input type="email" placeholder="Email" v-model="state.form.email" />
                <small v-if="v$.form.email.$error">
                    {{ v$.form.email.$errors[0].$message }}
                </small>
            </div>
            <div class="child">
                <input type="password" placeholder="Password" v-model="state.form.password" />
                <small v-if="v$.form.password.$error">
                    {{ v$.form.password.$errors[0].$message }}
                </small>
            </div>
            <div class="d-flex align-items-center justify-content-between mt-3 mb-3">
                <div class="d-flex gap-1">
                    <input type="checkbox" />
                    <label for="">Remember Me</label>
                </div>
                <div class="forget">
                    <RouterLink to="/forgetPassword" class="text-decoration-none">Forget Password?</RouterLink>
                </div>
            </div>
            <div class="submit">
                <button type="submit">Log In</button>
            </div>
            <!-- NOT HAVE -->
            <div class="notHave text-center">
                <h6>Haven't Account? <RouterLink to="/signUp">Create Now</RouterLink></h6>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { computed, reactive } from 'vue';
import { mapActions } from 'vuex';

export default {
    name: "LogInForm",
    setup() {
        const state = reactive({
            form: {
                email: "",
                password: "",
            }
        });
        const rules = computed(() => {
            return {
                form: {
                    email: [required, email],
                    password: [required, minLength(8)],
                }
            }
        });
        const v$ = useVuelidate(rules, state);
        return { rules, state, v$ }
    },
    methods: {
        ...mapActions({
            signIn: 'auth/signIn'
        }),
        LogIn() {
            this.v$.$validate();
            if (!this.v$.$error) { 
                this.signIn(this.state.form); 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('../../assets/css/form.scss');
</style>