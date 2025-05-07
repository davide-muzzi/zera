import { createRouter, createWebHistory } from 'vue-router'

import CalendarView from './views/CalendarView.vue'
import DashboardView from './views/DashboardView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView },
  { path: '/calendar', component: CalendarView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
