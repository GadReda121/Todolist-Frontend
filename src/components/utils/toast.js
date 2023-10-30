import { useToast } from 'vue-toastification';

const success = (message) => {
    const toast = useToast();
    toast.success(message);
}

const error = (message) => {
    const toast = useToast();
    toast.error(message);
}

export default {
    success,
    error
}