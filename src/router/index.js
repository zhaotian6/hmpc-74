import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/Login'
import Layout from '@/views/Layout'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  { path: '/', component: Layout }
]

const router = new VueRouter({
  routes
})

export default router
