import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import MainBox from '@/views/MainBox.vue'
import PageNotFound from '@/views/404.vue'
import RoutesConfig from './config'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'


const routes = [
  {
    path: '/',
    redirect: '/center'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  },
  {
    path: '/pagenotfound',
    name: 'pagenotfound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

RoutesConfig.forEach(item => {
  router.addRoute("mainbox", item)
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if(store.state.userInfo.role === 2) {
      next()
    } else {
      next('/pagenotfound')
    }
  } else {
    next()
  }
})

export default router
