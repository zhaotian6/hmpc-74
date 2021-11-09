import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import HmBreadcrumb from '@/components/HmBreadcrumb'
import VueQuillEditor from 'vue-quill-editor'
import channels from '@/components/channels'
import Cover from '@/components/Cover'
import './style/bast.less'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
Vue.component('hm-breadcrumb', HmBreadcrumb)
Vue.component('channels', channels)
Vue.component('cover', Cover)

const bus = new Vue()
// 把bus挂载到vue的原型上
Vue.prototype.$bus = bus
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
