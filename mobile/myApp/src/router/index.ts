import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { socket, CredentialManager } from "./../globals.js"
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/folder/:id',
    component: () => import('../views/FolderPage.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    component: () => import('../views/Signup.vue')
  }, {
    path: '/chat',
    component: () => import('../views/Chat.vue')
  },
  {
    path: '/logout',
    redirect: '/login',
    beforeEnter: (to, from, next) => {
      // Clear the token and user data


    }
  },
  {
    path: '/destroyaccount',
    redirect: '/login',
    beforeEnter: (to, from, next) => {
      // Clear the token and user data


    }
  },
  {
    path: '/datadeletion',
    redirect: '/login',
    beforeEnter: (to, from, next) => {
      // Clear the token and user data


    }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
