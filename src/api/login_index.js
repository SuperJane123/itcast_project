// 引入axios
import axios from '../utils/myaxios'

// 请求登陆验证
export const login = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
