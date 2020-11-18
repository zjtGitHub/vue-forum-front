import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid (state, val) {
      state.sid = val
    },
    setLogin (state, val) {
      state.isLogin = val
      localStorage.setItem('isLogin', val)
    },
    setToken (state, val) {
      state.token = val
      localStorage.setItem('token', val)
    },
    setUserInfo (state, val) {
      if (val === '') return
      state.userInfo = val
      localStorage.setItem('userInfo', JSON.stringify(val))
    },
    setCount (state, val) {
      if (val === '') return
      state.userInfo.count = val
      localStorage.setItem('userInfo', JSON.stringify(val))
    }
  },
  actions: {},
  modules: {}
})
