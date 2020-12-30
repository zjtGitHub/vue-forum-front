import axios from '@/utils/request'

// 获取评论列表
const getCommentList = (tid) => {
  return axios.get('/public/comment?tid=' + tid)
}

export {
  getCommentList
}
