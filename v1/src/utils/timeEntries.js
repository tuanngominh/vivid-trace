import moment from 'moment'

const getDate = (date) => {
  date = new Date(date)

  const today = new Date()
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)


  if (moment(date).isSame(today, 'day')) {
    return 'Today'
  } else if (moment(date).isSame(yesterday, 'day')) {
    return 'Yesterday'
  } else {
    return moment(date).format('ddd, D MMM')
  }
}

export const groupByDay = (timeEntries) => {
  //convert object to array
  const arr = Object.keys(timeEntries).map((key) => {
    const entry = Object.assign({}, timeEntries[key], {key})
    return entry
  })

  //sort by start date
  arr.sort(function(a, b){
    return new Date(b.startTime) - new Date(a.startTime)
  })

  let result = []
  arr.forEach((entry) => {
    const entryDate = getDate(entry.startTime)
    let found = false
    for (let i = 0, len = result.length; i < len; i++) {      
      if (result[i].date ===  entryDate) {
        result[i].entries.push(entry)
        found = true
        return
      }
    }
    if (!found) {
      result.push({
        date: entryDate,
        entries:[entry]
      })
    }
  })
  return result
}