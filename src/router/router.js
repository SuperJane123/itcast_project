// 引入vue
import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Wel from '@/views/wel.vue'
import Reports from '@/views/reports/reports.vue'
import Users from '@/views/user/users.vue'
import RightList from '../views/right/rightList.vue'
import RolttList from '../views/right/roleList.vue'
import Goods from '../views/goods/goods.vue'
import List from '../views/goods/list.vue'
import Add from '../views/goods/add.vue'

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
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { name: 'wel' },
      children: [
        {
          name: 'wel',
          path: 'wel',
          component: Wel
        },
        {
          name: 'reports',
          path: 'reports',
          component: Reports
        },
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'rightList',
          path: 'rights',
          component: RightList
        },
        {
          name: 'rolttList',
          path: 'roles',
          component: RolttList
        },
        {
          name: 'goods',
          path: 'goods',
          component: Goods,
          redirect: { name: 'list' },
          children: [
            {
              name: 'list',
              path: 'list',
              component: List
            },
            {
              name: 'add',
              path: 'add/:id',
              component: Add
            }

          ]
        }
      ]
    }

  ]

})
