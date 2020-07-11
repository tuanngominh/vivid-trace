import moment from 'moment'
import {pad0Left} from '../../utils/time'

export const durationInHour = (miliseconds) => {
  if (miliseconds === 0) {
    return 0
  }

  const duration = moment.duration(miliseconds)
  return duration.asHours() + Math.round(duration.minutes() / 60, 2)
}

export const durationInHourMinute = (miliseconds) => {
  if (miliseconds === 0) {
    return 0
  }
  
  const duration = moment.duration(miliseconds)
  return Math.floor(duration.asHours()) + ':' + duration.minutes()
}

export const getDateMonth = (time) => {
  if (typeof time === 'string' || typeof time === 'number') {
    time = new Date(time)
  }
  return pad0Left((time.getMonth() + 1)) + '/' + pad0Left(time.getDate())
}