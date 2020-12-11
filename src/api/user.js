import axios from '../utils/request'
export function login (mobile, code) {
  return axios({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
