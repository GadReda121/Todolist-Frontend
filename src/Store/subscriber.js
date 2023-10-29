import store from "@/Store";
import axios from "axios";
import Cookies from "js-cookie";

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}` 
                axios.defaults.headers.common['JWT'] = `${mutation.payload}` 
                Cookies.set('jwt', mutation.payload, { expires: 365 })
            } else {
                axios.defaults.headers.common['Authorization'] = null 
                Cookies.remove('jwt')
            }
        break;
    }
})