import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MainBox from '@/views/Mainbox.vue'
import RoutesConfig from './config'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

RoutesConfig.forEach(item => {
  router.addRoute("mainbox",item)
})

export default router
