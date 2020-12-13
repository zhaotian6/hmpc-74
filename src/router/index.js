import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/Login'
import Layout from '@/views/Layout'
import { getToken } from '@/utils/Storage.js'
import articles from '../views/Layout/articles/index.vue'
import pictures from '../views/Layout/pictures/index.vue'
import home from '../views/Layout/home/index.vue'
import notfound from '../views/notfound/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: home },
      { path: '/articles', component: articles },
      { path: '/pictures', component: pictures }
    ]
  },
  { path: '*', component: notfound }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.path === '/login' || token) {
    next()
  } else {
    next('./login')
  }
})
export default router
