// 引入axios
import axios from '../utils/myaxios'

// 获取角色列表数据
export const getAllRole = () => {
  return axios({
    url: 'roles'
  })
}

// 分配角色
export const editRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}
