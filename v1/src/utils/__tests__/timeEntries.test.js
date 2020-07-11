import TimezonedDate from 'timezoned-date'
global.Date = TimezonedDate.makeConstructor(0)

import {groupByDay} from '../timeEntries'

describe('Group time entries by day', () => {
  it(' ', () => {
    const startTime = new Date()
    let endTime = new Date()

    endTime.setMinutes(endTime.getMinutes() + 10)
    const input = {
      "-KbxxXcz16eJR9yLt7j2": {
        "endTime": endTime.toJSON(),
        "startTime": startTime.toJSON(),
        "text": "Time Entry 3"
      },      
      "-KbxshEl9QNUZP15DU0h": {
        "endTime": "2017-02-02T08:13:37.638Z",
        "startTime": "2017-02-02T08:13:01.618Z",
        "text": "Time Entry 1"
      },
      "-KbxxMXkuLAQcwpM5AD3": {
        "endTime": "2017-02-02T08:33:59.439Z",
        "startTime": "2017-02-02T08:13:47.202Z",
        "text": "Time Entry 2"
      },
      "-KbxyePFn1T8oUais5WR": {
        "endTime": "2017-02-03T08:39:38.916Z",
        "startTime": "2017-02-03T08:39:32.464Z",
        "text": "Time Entry 4"
      }
    }

    const output = [
      {
        date: 'Today',
        entries: [
          {
            "key": "-KbxxXcz16eJR9yLt7j2",
            "endTime": endTime.toJSON(),
            "startTime": startTime.toJSON(),
            "text": "Time Entry 3"            
          }
        ]
      },
      {
        date: 'Fri, 3 Feb',
        entries: [
          {
            "key": "-KbxyePFn1T8oUais5WR",
            "endTime": "2017-02-03T08:39:38.916Z",
            "startTime": "2017-02-03T08:39:32.464Z",
            "text": "Time Entry 4"
          }
        ]
      },      
      {
        date: 'Thu, 2 Feb',
        entries: [          
          {
            "key": "-KbxxMXkuLAQcwpM5AD3",
            "endTime": "2017-02-02T08:33:59.439Z",
            "startTime": "2017-02-02T08:13:47.202Z",
            "text": "Time Entry 2"
          },
          {
            "key": "-KbxshEl9QNUZP15DU0h",
            "endTime": "2017-02-02T08:13:37.638Z",
            "startTime": "2017-02-02T08:13:01.618Z",
            "text": "Time Entry 1"
          }
        ]
      }
    ]
    expect(groupByDay(input)).toEqual(output)
  })
})