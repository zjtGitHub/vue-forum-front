import axios from '@/utils/request'
import qs from 'qs'
// 获取评论列表
const getCommentList = (params) => {
  return axios.get('/public/comment?' + qs.stringify(params))
}

// 添加评论
const addComment = (data) => {
  return axios.post('/comment/reply', data)
}
// 编辑评论
const editComment = (data) => {
  return axios.post('/comment/update', data)
}
// 采纳最佳答案
const setBest = (params) => {
  return axios.get('/comment/accept?' + qs.stringify(params))
}
export {
  getCommentList,
  addComment,
  editComment,
  setBest
}
