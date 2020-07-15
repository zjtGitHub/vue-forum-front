import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: ''
  },
  mutations: {
    setSid (state, val) {
      state.sid = val
    }
  },
  actions: {},
  modules: {}
})
