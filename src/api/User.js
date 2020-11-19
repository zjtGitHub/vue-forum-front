import axios from '@/utils/request'
import store from '@/store'

const headers = {
  Authorization: 'Bearer ' + store.state.token,
  'Content-Type': 'application/json'
}
/**
 * 用户签到接口
 * @param {Object} options
 * @returns {*}
 */
const signIn = () => {
  console.log(headers)
  return axios.get('/user/fav', {
    headers
  })
}

export {
  signIn
}
