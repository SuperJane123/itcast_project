// 引入axios
import axios from '../utils/myaxios'

// 获取角色列表数据
export const getAllRole = () => {
  return axios({
    url: 'roles'
  })
}

export const editRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}
