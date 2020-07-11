import React from 'react'
import {getSummaryReport, getEffortByTagForDoughnutChart} from '../selectors'

import moment from 'moment'
import 'moment-timezone'

//Need setting timezone so during comparison nodejs doesn't use local timezone which will be different in dev env and ci env
moment.tz.setDefault('UTC')

describe('Selector for report data', () => {
  const getTime = (day, hours, minutes) => {
    if (!hours) {
      hours = 0
    }
    if (!minutes) {
      minutes = 0
    }
    const date = new Date(Date.UTC(2017, 1, day, hours, minutes, 0))
    return date.getTime()
  }

  const toMiliseconds = (hours, minutes) => {
    let mili = 0
    if (minutes) {
      mili += minutes * 60 * 1000
    }
    if (hours) {
      mili += hours * 60 * 60 * 1000
    }
    return mili
  }

  const entries = {
    '-KcmfMSMMEaPZvVb_ijs': {//1 hour long
      endTime: getTime(10, 21),//21 PM, day 10th
      startTime: getTime(10, 20),//20 PM, day 10th
      tag: 'tag1',
      tagName: 'tag 1',
      tagColor: 'tag color 1',
      text: 'entry 1'
    },
    '-KcmfMSMMEaPZvVb_hdj': {//1 hour long
      endTime: getTime(10, 21),//21 PM, day 10th
      startTime: getTime(10, 20),//20 PM, day 10th
      tag: 'tag1',
      tagName: 'tag 1',
      tagColor: 'tag color 1',
      text: 'entry 2'
    },    
    '-KcmfQxZsRi7gQit-xuN': {//30 minutes long
      endTime: getTime(12, 20, 30),//20:30 PM day 12th
      startTime: getTime(12, 20, 0),//20 PM day 12th
      tag: 'tag2',
      tagName: 'tag 2',
      tagColor: 'tag color 2',      
      text: 'entry 2'
    }
  }

  describe ('can get total hour and bar chart data', () => {
    it ('Should filter data', () => {
      const state = {
        report: {
          entries: entries,
          startDate: getTime(10),//date 10th
          endDate: getTime(12)//date 12th
        }
      }

      expect(getSummaryReport(state)).toEqual({
        totalEffort: '02:30',
        effortByDayForBarChart: {
          labels: ["10th Feb", "11th Feb", "12th Feb"],
          data: [toMiliseconds(2), 0, toMiliseconds(0, 30)]
        }
      })
    })

    it ('should return empty data if there is no entries', () => {
      const state = {
        report: {
          entries: [],
          startDate: getTime(10),//date 10th
          endDate: getTime(12)//date 12th
        }
      }

      expect(getSummaryReport(state)).toEqual({
        totalEffort: '00',
        effortByDayForBarChart: {
          labels: ["10th Feb", "11th Feb", "12th Feb"],
          data: [0, 0, 0]
        }
      })
    })

    it ('should return empty data if start date greater than end date', () => {
      const state = {
        report: {
          entries: entries,
          startDate: getTime(12),//date 12th
          endDate: getTime(10)//date 10th
        }
      }

      expect(getSummaryReport(state)).toEqual({
        totalEffort: '00',
        effortByDayForBarChart: {
          labels: [],
          data: []
        }
      })
    })    
  })

  describe ('can get doughnut chart data', () => {
    it('should return data', () => {
      const state = {
        report: {
          entries: entries,
        }
      }
      expect(getEffortByTagForDoughnutChart(state)).toEqual({
        labels: ['tag 1', 'tag 2'],
        datasets: [{
          data: [toMiliseconds(2), toMiliseconds(0, 30)],
          backgroundColor: ['tag color 1', 'tag color 2']
        }]
      })
    })

    it ('should return empty data when there is no entries', () => {
      const state = {
        report: {
          entries: [],
        }
      }

      expect(getEffortByTagForDoughnutChart(state)).toEqual({
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      })
    })
  })

})
