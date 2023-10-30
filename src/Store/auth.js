import axios from "axios";
import toast from '../components/utils/toast';
import catchError from "../components/utils/catch";

export default {
    namespaced:true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },

        SET_USER(state, data) {
            state.user = data;
        },
    },
    actions: {
        async signIn({ dispatch }, credentials){
            let response = await axios
              .post("/auth/login", credentials)
              .then((result) => {
                if(result.status == 200){
                  toast.success('Log in Successfully')
                }
                return result;
              }).catch((e) => {
                catchError(e);
              });
              dispatch('attempt', response.data.data.token);
        },
        async register({ dispatch }, credit) {
            // store token
            let response = await axios
              .post("auth/register", credit)
              .then((result) => {
                toast.success('Register Successfully')
                return result;
              })
              .catch((e) => {
                  catchError(e);
              });
            let token = response.data.data.user.token;
            dispatch("attempt", token);
            // Cookies.set("JWT", token, { expires: 365 });
        },
        async attempt({ commit, state}, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }
            if (!state.token) {
                return
            }
            try {
                let response = await axios.get("/auth/profile");
                commit('SET_USER', response.data.data.user);
            } catch (e) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },
        signOut({commit, state}) {
            return axios
              .get("/auth/logout")
              .then((response) => {
                if(response.status == 200){
                  toast.success('Log out Successfully')
                }
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
              })
              .then((result) => {
                return result;
              })
              .catch((e) => {
                catchError(e);
              });
        }
    },
}