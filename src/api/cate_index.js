import axios from '../utils/myaxios'

// 获取商品数据列表
export const getAllCate = (type) => {
  return axios({
    url: `categories`,
    params: { type }

  })
}

// 添加动态参数或者静态属性
export const getStaticData = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }

  })
}
