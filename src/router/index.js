import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'login' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'login' */ '../views/Forget.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      console.log('to:', to)
      console.log('from:', from)
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new Router({
  routes
})

export default router
