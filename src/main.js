import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import './assets/main.css';

import 'animate.css';

// !store
import index from './Store/index';

// !Vuex
import Vuex from 'vuex';

// !Subscribe
import './Store/subscriber';

// !Axios
import axios from 'axios';
axios.defaults.baseURL = 'https://todolist-8ins.onrender.com/api';

// !BOOTSTARP
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// !TOAST
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// !Cookies
import Cookies from 'js-cookie';

index.dispatch('auth/attempt', Cookies.get('jwt')).then(() => {
    const app = createApp(App)
    app.use(router);
    app.use(index);
    app.use(Toast);
    app.use(Vuex);
    app.mount('#app')
})
