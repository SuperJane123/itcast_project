// 引入axios
import axios from '../utils/myaxios'

// 获取所有用户数据
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 添加新用户
export const addNewUser = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}
