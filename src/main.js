// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'

// 设置反向代理，前端请求默认发送到 http://localhost:8027/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8027/api'
Vue.config.productionTip = false
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(mavonEditor)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 进入的这个路由需要权限才能进入
    if (store.state.user.username) {
      next()
    } else {
      next({
        // 不需要权限就能进入
        path: 'login',
        query: {redirect: to.fullPath}
        // 把要跳转的地址作为参数传到下一步
      })
    }
  } else {
    next()
  }
}
)
