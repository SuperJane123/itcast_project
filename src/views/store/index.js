// 引入路由
import Vue from 'vue'

// 引入vuex
import Vuex from 'vuex'

// 让每个组件都使用这个vuex
Vue.use(Vuex)

export default new Vuex.Store({
  // 需要储存的数据/
  state: {
    username: ''
  },

  //   操控state中数据的函数集合,同步方式
  mutations: {
    setUsername (state, val) {
      // 把名字储存到本地数据里
      localStorage.setItem('vuex_username', val)
      state.username = val
    }
  },

  // 触发mutations中函数的函数集合
  actions: {
    setAction ({ commit }, val) {
      commit('setUsername', val)
    }
  },

  //   获取数据
  getters: {
    getUsername () {
      return localStorage.getItem('vuex_username')
    }
  }
})
