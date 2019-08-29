import axios from '../utils/myaxios'

// 获取商品列表数据
export const getAllGoods = (params) => {
  return axios({
    url: 'goods',
    params
  })
}
