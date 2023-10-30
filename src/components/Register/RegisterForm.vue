<template>
    <div class="contact">
        <form @submit.prevent="Register">
            <h3 class="mb-4 fs-1 text-center">SIGN UP</h3>
            <div class="child">
                <input type="text" placeholder="Name" v-model="state.form.name" />
                <small v-if="v$.form.name.$error">
                    {{ v$.form.name.$errors[0].$message }}
                </small>
            </div>
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
            <div class="child">
                <input type="password" placeholder="Confirm Password" v-model="state.form.passwordConfirm" />
                <small v-if="v$.form.passwordConfirm.$error">
                    {{ v$.form.passwordConfirm.$errors[0].$message }}
                </small>
            </div>
            <div class="submit">
                <button type="submit">Create Now</button>
            </div>
            <!-- NOT HAVE -->
            <div class="text-center">
                <h6>Have Account? <RouterLink to="/Login">Log in</RouterLink></h6>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import { computed, reactive } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "RegisterForm",
    setup() {
        const state = reactive({
            form: {
                name: "",
                email: "",
                password: "",
                passwordConfirm: ""
            }
        });
        const rules = computed(() => {
            return {
                form: {
                    name: [required, minLength(3)],
                    email: [required, email],
                    password: [required, minLength(8)],
                    passwordConfirm: [required, minLength(8), sameAs(state.form.password)]
                }
            }
        });
        const v$ = useVuelidate(rules, state);
        return { rules, state, v$ }
    },
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
        }),
    },
    methods: {
        ...mapActions({
            register: "auth/register"
        }),
        Register() {
            this.v$.$validate();
            if (!this.v$.$error) { 
                let status = this.register(this.state.form);
                status.then(() => {
                    this.$router.push("/")
                })

                if (this.authenticated) {
                    this.$router.push("/");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('../../assets/css/form.scss');
</style>