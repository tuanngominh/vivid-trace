export const pad0Left = (num) => (String('0' + num).slice(-2))

//build time duration in format hh:mm:ss
export const getTimeDuration = (startTime, endTime) => {
  if (typeof startTime === 'string' || typeof startTime === 'number') {
    startTime = new Date(startTime)
  }

  if (typeof endTime === 'string' || typeof endTime === 'number') {
    endTime = new Date(endTime)
  }

  const durationInSecond = Math.round((endTime - startTime) / 1000)
  let second = durationInSecond % 60
  let durationInMinute = 0
  let minute = 0
  if (durationInSecond > second) {
    durationInMinute = (durationInSecond - second) / 60
    minute = durationInMinute % 60
  }
  let durationInHour = 0
  let hour = 0
  if (durationInMinute > minute) {
    durationInHour = (durationInMinute - minute) / 60
    hour = durationInHour % 60
  }

  return pad0Left(hour) + ':' + pad0Left(minute) + ':' + pad0Left(second)
}

/*

@date Date
@return string 
"10:10 PM"
*/
export const toAmPm = (date) => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  
  if (date instanceof Date) {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const amPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    return hours + ':' + pad0Left(minutes) + ' ' + amPm    
  } else {
    console.error("input is not a date")
    return false
  }
}

/*

@amPm: 10:10 PM

@return {
  hours: 10,
  minutes: 10,
  amPm: 'pm'
}
*/
export const fromAmPM = (amPm) => {
  const amPmRegExp = /(\d+)\s*:\s*(\d+)\s*(AM|PM)/i
  const matches = amPmRegExp.exec(amPm)
  if (matches) {
    return {
      hours: parseInt(matches[1], 10),
      minutes: parseInt(matches[2], 10),
      amPm: matches[3].toLowerCase()
    }
  } else {
    return null
  }
}

/*
Calculate a Date object from user start time input

@amPm string user input of start time in format hh:mm:ss
@now Date current time
@return Date 
if time is greater than now so return Date with one day back
e.g. if @now : Jan 2 2017, 10:10PM and @amPM is 10:20PM then @return : Jan 1 2017, 10:20 PM
e.g. if @now : Jan 2 2017, 10:10PM and @amPM is 9:20PM then @return : Jan 2 2017, 9:20 PM
*/
export const fromAmPmToDate = (amPm, now) => {
  const amPmObj = fromAmPM(amPm)
  if (amPmObj) {
    const hours = (amPmObj.amPm === 'pm') ? amPmObj.hours + 12 : amPmObj.hours
    let date = new Date(now.getTime())
    date.setHours(hours, amPmObj.minutes)
    if (date > now) {
      date.setDate(date.getDate() - 1)
    }
    return date
  }
  return null
}