import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

// 引入路由
import router from '@/router/router'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加导航守卫，to：目标路由对象，里面的一个属性path就是目标路由的path值
router.beforeEach((to, from, next) => {
  // 获取token
  let mytoken = localStorage.getItem('itcast_manager_token')
  if (mytoken || to.path === '/login') {
    next()
  } else {
    // 重定向
    next({ path: '/login' })
  }
})

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
