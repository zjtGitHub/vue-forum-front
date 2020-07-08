import axios from '@/utils/request'

/**
 * 获取验证码
 * @param sid 唯一标识
 * @returns {*}
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

/**
 * 找回密码
 * @param option 用户信息(邮箱,验证码)
 * @returns {*}
 */
const forget = (option) => {
  return axios.post('/auth/forget', {
    ...option
  })
}

/**
 * 登陆接口
 * @param loginInfo 用户登录信息
 */
const login = (loginInfo) => {
  return axios.post('/auth/login', {
    ...loginInfo
  })
}

/**
 * 注册接口
 * @param regInfo 用户登录信息
 */
const reg = (regInfo) => {
  return axios.post('/auth/reg', {
    ...regInfo
  })
}
export {
  getCode,
  forget,
  login,
  reg
}
