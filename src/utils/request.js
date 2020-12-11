import axios from 'axios'
const aa = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  timeout: 300
})
export default aa
