import { ValidationProvider, extend, localize, ValidationObserver } from 'vee-validate'
import { required, email, min, max, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

// 语言本地化
localize('zh_CN', {
  messages: { // 规则对应的提示消息
    ...zh.messages,
    required: '请输入{_field_}',
    email: '请输入正确的邮箱格式',
    min: '不符合最小长度要求',
    confirmed: '两次输入内容不一致'
  },
  names: { // 表单的name值在{_field_}中的映射
    email: '邮箱',
    username: '用户名',
    password: '密码',
    code: '验证码',
    nickname: '昵称'
  },
  fields: { // 对单独表单的规则，自定义提示
    username: {
      email: '邮箱格式不正确'
    },
    password: {
      confirmed: '两次输入不一致你'
    }
  }
})

extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)
extend('required', required)

export {
  ValidationProvider,
  ValidationObserver
}
