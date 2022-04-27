import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Open Graph Image Builder',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
