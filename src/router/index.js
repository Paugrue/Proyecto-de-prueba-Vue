// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserDetail from '../views/UserDetail.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/users/:id', name: 'user', component: UserDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router