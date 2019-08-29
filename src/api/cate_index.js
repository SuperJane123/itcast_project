import axios from '../utils/myaxios'

export const getAllCate = (type) => {
  return axios({
    url: `categories`,
    params: { type }

  })
}
