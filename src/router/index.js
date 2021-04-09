import Vue from 'vue'
import routes from './routers'
import Router from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
Vue.use(Router)
const router = new Router(routes)
// 每次路由跳转前,判断token是否过期
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 如果缓存中存在token并且没过期 直接登录
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setLogin', true)
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      store.commit('setToken', '')
      store.commit('setUserInfo', {})
      store.commit('setLogin', false)
      localStorage.clear()
    }
  }
  // 如果没有token，走到这里，判断去往的页面是否需要鉴权。如果不需要，继续，需要的话，判断store中的isLogin是true，则继续，否则跳往登录页。
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
