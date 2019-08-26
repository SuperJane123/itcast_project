import axios from '../utils/myaxios'

// 获取所有权限列表
export const getAllrights = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 获取所有角色列表
export const getAllroles = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定权限
export const delRightById = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
