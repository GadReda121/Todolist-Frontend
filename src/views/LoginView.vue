<template>
    <div class="login">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../components/login/LoginForm.vue';
export default {
    components: {
        LoginForm
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>