import Vue from 'vue'
import Vuex from 'vuex'
import WebsocketClient from '@/utils/websocket'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    num: {},
    ws: null
  },
  mutations: {
    initWebSocket (state, config) {
      state.ws = new WebsocketClient(config)
      state.ws.init()
    },
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
    },
    // 设置container的状态
    setHide (state, value) {
      state.isHide = value
    },
    setMessage (state, value) {
      state.num = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  },
  modules: {}
})
