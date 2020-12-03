import axios from '@/utils/request'
/**
 * 用户签到接口
 * @param {Object} options
 * @returns {*}
 */
const signIn = () => {
  return axios.get('/user/fav')
}

/**
 * 修改基本设置接口
 * @param {Object} options
 * @returns {*}
 */
const updateUserInfo = (data) => {
  return axios.post('/user/basic', data)
}

export {
  signIn,
  updateUserInfo
}
