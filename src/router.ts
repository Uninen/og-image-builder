import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import StyleguidePage from '@/pages/StyleguidePage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: {
      title: 'Open Graph Image Builder',
    },
  },
  {
    path: '/styleguide/',
    component: StyleguidePage,
    meta: {
      title: 'Style Guide',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
