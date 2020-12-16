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
export function delet (idd) {
  return axios({
    method: 'delete',
    url: ` /mp/v1_0/articles/${idd}`
  })
}
