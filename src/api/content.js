import axios from '@/utils/request'
import qs from 'qs'
/**
 * 获取文章列表
 * @param {Object} options 读取文章列表接口参数
 * @returns {*}
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * 获取温馨提醒
 */
const getTips = () => {
  return axios.get('/public/tips')
}

/**
 * 获取本周热议
 */
const getTop = () => {
  return axios.get('/public/topWeek')
}

/**
 * 获取友情链接
 */
const getLinks = () => {
  return axios.get('/public/links')
}

// 上传图片
const uploadImg = (formData) => axios.post('/content/uploadImg', formData)

// 发表帖子
const addPost = (data) => axios.post('/content/add', { ...data })

export {
  getList,
  getTips,
  getLinks,
  getTop,
  uploadImg,
  addPost
}
