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
export function reqUserInfo () {
  return axios({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
}
