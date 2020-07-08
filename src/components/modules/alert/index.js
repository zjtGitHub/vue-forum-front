import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  console.log(Vue)
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()

  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg) => {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = success
    }
  }
}

export default Alert
