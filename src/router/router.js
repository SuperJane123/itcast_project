// 引入vue
import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/views/login.vue'

// 让vue使用路由管理
Vue.use(VueRouter)

// 创建路由对象
export default new VueRouter({
  // 使用routes配置
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]

})
