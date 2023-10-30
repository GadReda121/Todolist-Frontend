import Vuex from 'vuex';
import auth from './auth';
import tasks from './tasks';

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        tasks
    },
})