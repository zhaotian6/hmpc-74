import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login }
]

const router = new VueRouter({
  routes
})

export default router
