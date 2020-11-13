import axios from '@/utils/request'
import qs from 'qs'
/**
 * 签到接口
 * @param {Object} options 读取文章列表接口参数
 * @returns {*}
 */
const signIn = (options) => {
  return axios.get('/user/fav?' + qs.stringify(options))
}

export {
  signIn
}
