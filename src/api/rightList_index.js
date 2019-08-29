import axios from '../utils/myaxios'

// 获取所有权限列表
export const getAllrights = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 获取左侧菜单权限
export const getLeftMenus = () => {
  return axios({
    url: 'menus'
  })
}
