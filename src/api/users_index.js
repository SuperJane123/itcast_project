// 引入axios
import axios from '../utils/myaxios'

export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}
