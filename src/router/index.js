import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import LoginView from '../components/LoginView.vue'
import RegistrationView from '../components/RegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/logins',
      name: 'login',
      component: LoginView
    },
    {
      path: '/registration',
      name: 'register',
      component: RegistrationView
    },
  ]
})

export default router
