// 引入axios
import axios from 'axios'

// 设置基准地址
axios.defaults.baseURL = 'http://192.168.70.26:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://192.168.1.101:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://192.168.70.109:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //   1.获取token值
  let mytoken = localStorage.getItem('itcast_manager_token')
  if (mytoken) {
    //   2.设置请求头:config.headers是一个对象
    config.headers.Authorization = mytoken
  }

  //   在请求头添加Authorization 属性
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 暴露
export default axios
