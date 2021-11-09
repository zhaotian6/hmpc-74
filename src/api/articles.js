import axios from '../utils/request'
export function getarticles (params = {}) {
  return axios({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}
// 频道列表
export function getchannels () {
  return axios({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export function delet (idd) {
  return axios({
    method: 'delete',
    url: `/mp/v1_0/articles/${idd}`
  })
}
// 添加文章
export function addArticle (data) {
  return axios({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data
  })
}
// 评论那个
export function updateCommentStatus (article_id, allow_comment) {
  return axios({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id
    },
    data: {
      allow_comment
    }
  })
}
