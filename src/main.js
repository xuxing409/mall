import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
Vue.config.productionTip = false

// 安装toast插件
// 内部挂载Vue.prototype.$toast = toast
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/load.gif')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
