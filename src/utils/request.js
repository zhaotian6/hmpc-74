import axios from 'axios'
import { getToken } from '../utils/Storage.js'
const aa = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  timeout: 3000
})
aa.interceptors.request.use(function (config) {
  const token = getToken()
  if (token) {
    config.headers.Authorization = 'Bearer' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

aa.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})
export default aa
