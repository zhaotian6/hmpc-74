import axios, { baseURL } from '../utils/request'

// 获取图片
export function getImages (images) {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params: images
  })
}
// 收藏接口
export function collectPicture (id, collect) {
  return axios({
    method: 'PUT',
    url: '/mp/v1_0/user/images/' + id,
    data: {
      collect
    }
  })
}
export function deletePicture (id) {
  return axios({
    method: 'DELETE',
    url: '/mp/v1_0/user/images/' + id
  })
}
export const uploadUrl = baseURL + 'mp/v1_0/user/images'
