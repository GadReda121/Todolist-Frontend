import { createRouter, createWebHistory } from 'vue-router'
import store from "@/Store";
import HomeView from '../views/HomeView.vue'

function checkUser(to, from, next) {
  if (!store.getters["auth/authenticated"]) {
    next();
  }
  next("/");
} 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: checkUser
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('../views/NotFoundView.vue')
    // }
  ]
})

export default router
