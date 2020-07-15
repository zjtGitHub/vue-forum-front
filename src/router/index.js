import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home.vue'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'login' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'login' */ '../views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ '../views/channels/Template1.vue')
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
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
