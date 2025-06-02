import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import CalendarView from '../views/CalendarView.vue'
import DashboardView from '../views/DashboardView.vue'
import BackendTestView from '../views/BackendTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/logins',
      name: 'logins',
      component: LoginView
    },
    {
      path: '/registration',
      name: 'register',
      component: RegistrationView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/',
      name: 'dash',
      component: DashboardView
    },
    {
      path: '/back',
      name: 'backend',
      component: BackendTestView
    },
  ]
})

export default router
