import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'
import filters from '@/utils/filter'
import directives from '@/utils/directive'
Object.keys(filters).forEach((item) => {
  Vue.filter(item, filters[item])
})
Object.keys(directives).forEach((item) => {
  Vue.directive(item, directives[item])
})
Vue.use(Alert)
Vue.use(Pop)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
