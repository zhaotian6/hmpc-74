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
export function layout () {
  return axios({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}

export function updateAvatar (fd) {
  return axios({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data: fd
  })
}

export function updateUserInfo (data) {
  return axios({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}
