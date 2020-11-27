import PopComponent from './Pop'

const Pop = {}

Pop.install = (Vue) => {
  const PopConstructor = Vue.extend(PopComponent)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$pop = (msg, type) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default Pop
