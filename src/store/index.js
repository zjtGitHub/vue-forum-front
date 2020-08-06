import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: localStorage.getItem('isLogin'),
    token: ''
  },
  mutations: {
    setSid (state, val) {
      state.sid = val
    },
    setLogin (state, val) {
      state.isLogin = val
    }
  },
  actions: {},
  modules: {}
})
