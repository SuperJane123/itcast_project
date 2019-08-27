import axios from '../utils/myaxios'

// 获取所有权限列表
export const getAllrights = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
