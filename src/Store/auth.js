import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from 'vue-toastification';

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
                const toast = useToast();
                toast.info(`تم تسجيل الدخول بنجاح`, {
                  position: "top-right",
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: "button",
                  icon: true,
                  rtl: true,
                });
                return result;
              });
              dispatch('attempt', response.data.data.token);
        },
        async register({ dispatch }, credit) {
            // store token
            let response = await axios
              .post("auth/register", credit)
              .then((result) => {
                const toast = useToast();
                toast.info(`تم التسجيل بنجاح`, {
                  position: "top-right",
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true
                });
                return result;
              })
              .catch((e) => {
                  console.log(e);
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
              .then(() => {
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
              })
              .then((result) => {
                const toast = useToast();
                toast.info(`تم تسجيل الخروج بنجاح`, {
                  position: "top-right",
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: "button",
                  icon: true,
                  rtl: true,
                });
                return result;
              })
              .catch(() => {
                const toast = useToast();
                toast.error("حدث خطأ ، حاول مرة أخرى", {
                  position: "top-right",
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: true,
                  closeButton: "button",
                  icon: true,
                  rtl: false,
                });
              });
        }
    },
}