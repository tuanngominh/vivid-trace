import {fromAmPM, fromAmPmToDate} from '../time'

describe('fromAmPM', () => {
  it('correct format', () => {
    expect(fromAmPM('10:10 PM')).toEqual({
      hours: 10,
      minutes: 10,
      amPm: 'pm'
    })
    expect(fromAmPM('10:10PM')).toEqual({
      hours: 10,
      minutes: 10,
      amPm: 'pm'
    })
    expect(fromAmPM('1:1 am')).toEqual({
      hours: 1,
      minutes: 1,
      amPm: 'am'
    })
    expect(fromAmPM('10  :  10   pM')).toEqual({
      hours: 10,
      minutes: 10,
      amPm: 'pm'
    })
  })

  it('wrong format', () => {
    expect(fromAmPM('111:111 CM')).toBeNull()
    expect(fromAmPM(' ')).toBeNull()
  })
})

const toAmPMWithMinuteOffset = (date, minuteOffset) => {
  //hours, minutes in local timezone
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const amPm = (hours >= 12) ? 'pm' : 'am'
  hours = (hours >= 12) ? hours - 12 : hours
  const newAmPm = hours + ':' + (minutes + minuteOffset) + ' ' + amPm
  return newAmPm
}

describe('fromAmPmToDate', () => {
  it('set time to later than current time', () => {
    const now = new Date('2017-01-29T22:10:00.000Z') //29 Jan 2017, 10:10PM in UTC
    const returnDate = new Date('2017-01-28T22:20:00.000Z') //28 Jan 2017, 10:20PM
    const newAmPm = toAmPMWithMinuteOffset(now, 10)
    expect(fromAmPmToDate(newAmPm, now)).toEqual(returnDate)
  }) 

  it('set time to sooner than current time', () => {
    const now = new Date('2017-01-29T22:10:00.000Z') //29 Jan 2017, 10:10PM in UTC
    const returnDate = new Date('2017-01-29T22:00:00.000Z') //28 Jan 2017, 10:20PM
    const newAmPm = toAmPMWithMinuteOffset(now, -10)
    expect(fromAmPmToDate(newAmPm, now)).toEqual(returnDate)
  })
})