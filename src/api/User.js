import axios from '@/utils/request'
import store from '@/store'
/**
 * 用户签到接口
 * @param {Object} options
 * @returns {*}
 */
const signIn = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token,
    'Content-Type': 'application/json'
  }
  return axios.get('/user/fav', {
    headers
  })
}

export {
  signIn
}
