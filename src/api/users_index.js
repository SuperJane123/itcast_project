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

// 编辑用户信息
export const editUser = (data) => {
  return axios({
    method: 'put',
    url: `users/${data.id}`,
    data
  })
}

// 删除用户
export const delUserById = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

// 修改用户状态
export const updateUserStatus = (uid, type) => {
  return axios({
    method: 'put',
    url: `users/${uid}/state/${type}`

  })
}

// 分配角色
export const editRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}
