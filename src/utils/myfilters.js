import Monent from 'moment'

export const timeFormat = (time) => {
  time = new Date(time * 1000)
  return Monent(time).format('YYYY-MM-DD HH:mm:ss')
}
