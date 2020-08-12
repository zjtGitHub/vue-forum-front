import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home.vue'
import store from '@/store'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ '../views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'center' */ '../views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '../components/user/Center.vue')
const Setting = () => import(/* webpackChunkName: 'setting' */ '../components/user/Setting.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '../components/user/Msg.vue')
const Post = () => import(/* webpackChunkName: 'user-post' */ '../components/user/Post.vue')
const Others = () => import(/* webpackChunkName: 'user-others' */ '../components/user/Others.vue')
const User = () => import(/* webpackChunkName: 'user' */ '../views/User.vue')
const MyInfo = () => import(/* webpackChunkName: 'MyInfo' */ '../components/user/common/MyInfo.vue')
const Password = () => import(/* webpackChunkName: 'PassWord' */ '../components/user/common/Password.vue')
const PicUpload = () => import(/* webpackChunkName: 'PicUpload' */ '../components/user/common/PicUpload.vue')
const BindAccount = () => import(/* webpackChunkName: 'BindAccount' */ '../components/user/common/BindAccount.vue')

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
  },
  {
    path: '/user:uid',
    name: 'home',
    props: true,
    component: User
  },
  {
    path: '/center',
    component: Center,
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting,
        linkActiveClass: 'layui-this',
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'password',
            name: 'password',
            component: Password
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'account',
            name: 'account',
            component: BindAccount
          }
        ]
      },
      {
        path: 'post',
        name: 'post',
        component: Post
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ],
    beforeEnter: (to, from, next) => {
      console.log(store)
      if (store.state.isLogin) {
        next()
      } else {
        next('login')
      }
    }
  }
]

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
