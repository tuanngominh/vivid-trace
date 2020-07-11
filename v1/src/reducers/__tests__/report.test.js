import reducer from '../report'
import * as types from '../../constants/ActionTypes'

describe('report reducer', () => {

  it('initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('can fetch filtered entries from server - fetching', () => {
    const isFetching = true
    let startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    let endDate = new Date()

    expect(
      reducer(undefined, {
        type: types.REPORT_FETCH,
        isFetching,
        payload : {startDate, endDate}
      })
    ).toEqual({entries: {}, isFetching, startDate, endDate})
  })

  it('can fetch filtered entries from server - success', () => {
    const isFetching = false
    let startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    let endDate = new Date()
    let entryStartTime = new Date(startDate.getTime())
    entryStartTime.setMinutes(entryStartTime.getMinutes() - 10)
    const entries = {
      '-KcmfMSMMEaPZvVb_ijs': {
        endTime: entryStartTime.getTime(),
        startTime: endDate.getTime(),
        text: 'entry 1'
      }
    }    

    expect(
      reducer(undefined, {
        type: types.REPORT_FETCH,
        status: 'success',
        payload: {entries, startDate, endDate},
        isFetching
      })
    ).toEqual({entries, isFetching, startDate, endDate})
  })

})