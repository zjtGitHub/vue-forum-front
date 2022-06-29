/*
 * @Author: zhangjintong
 * @Date: 2021-03-10 22:47:47
 * @LastEditTime: 2022-06-29 23:30:11
 * @LastEditors: zhangjintong
 * @FilePath: \vue-forum-front\src\api\content.js
 */
import axios from '@/utils/request'
import store from '@/store'
import qs from 'qs'
/**
 * 获取文章列表
 * @param {Object} options 读取文章列表接口参数
 * @returns {*}
 */
const getList = options => {
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
 * 获取头条
 */
const getHeadlines = () => {
  return axios.get('/public/getHeadlines')
}

/**
 * 获取头条详情
 */
const getHeadlinesDetail = id => {
  return axios.get('/public/getHeadlinesDetail?id=' + id)
}

/**
 * 获取友情链接
 */
const getLinks = () => {
  return axios.get('/public/links')
}

// 上传图片
const uploadImg = formData => axios.post('/content/uploadImg', formData)

// 发表帖子
const addPost = data => axios.post('/content/add', { ...data })
// 编辑帖子
const editPost = data => axios.post('/content/edit', { ...data })
// 获取文章详情
const getDetail = tid => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/detail?tid=' + tid, headers)
}
export {
  getList,
  getTips,
  getLinks,
  getTop,
  uploadImg,
  addPost,
  editPost,
  getDetail,
  getHeadlines,
  getHeadlinesDetail
}
