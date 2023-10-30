<template>
    <div class="login">
        <RegisterForm />
    </div>
</template>

<script>
import RegisterForm from '../components/Register/RegisterForm.vue';
export default {
    components: {
        RegisterForm
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