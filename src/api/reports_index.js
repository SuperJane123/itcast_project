import axios from '../utils/myaxios'

export const getReports = () => {
  return axios({
    url: 'reports/type/1'
  })
}
