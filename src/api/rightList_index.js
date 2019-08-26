import axios from '../utils/myaxios'

export const getAllrights = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
