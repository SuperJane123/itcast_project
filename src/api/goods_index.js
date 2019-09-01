import axios from '../utils/myaxios'

// 获取商品列表数据
export const getAllGoods = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 添加商品
export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data

  })
}

// 根据id号获取响应的商品
export const getGoodsById = (id) => {
  return axios({
    url: `goods/${id}`
  })
}

// 根据id号编辑商品
export const editGoodsbyId = (id, data) => {
  return axios({
    url: `goods/${id}`,
    method: 'put',
    data
  })
}

// 删除商品
export const delGoodsById = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'delete'
  })
}
