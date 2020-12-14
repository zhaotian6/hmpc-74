import axios from '../utils/request'
export function getarticles (params = {}) {
  return axios({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}
