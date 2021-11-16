import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Login.vue'
import Login from "../views/Login";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
