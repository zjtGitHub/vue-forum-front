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

// 获取用户信息
const getUserInfo = () => axios.get('/user/getUserInfo')

// 修改密码
const updatePassword = (data) => axios.post('/user/updatePassword', data)

// 设置收藏 & 取消收藏
const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data))

// 获取收藏列表
const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data))
export {
  signIn,
  updateUserInfo,
  updateUsername,
  getUserInfo,
  updatePassword,
  addCollect,
  getCollect
}
