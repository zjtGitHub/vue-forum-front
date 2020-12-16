import axios from '@/utils/request'
import qs from 'qs'
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

// 确认修改邮箱
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))

export {
  signIn,
  updateUserInfo,
  updateUsername
}
