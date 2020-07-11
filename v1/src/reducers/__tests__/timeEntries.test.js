import reducer from '../timeEntries'
import * as types from '../../constants/ActionTypes'

describe('timeEntries reducer', () => {

  it('initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('return empty entries list during fetching from server', () => {
    const isFetching = true

    expect(
      reducer(undefined, {
        type: types.TIME_ENTRIES_FETCH_LIST,
        isFetching
      })
    ).toEqual({entries: {}, isFetching})
  })

  const startTime = (new Date(Date.UTC(2017, 1, 12, 20, 20, 0))).getTime()
  const endTime   =   (new Date(Date.UTC(2017, 1, 12, 20, 40, 0))).getTime()
  const entryText = 'entryText'
  const entryId   = 'entry1'
  const tagId     = 'tag1'

  it('doesn\'t modify current entries during fetching from server', () => {
    const isFetching = true
    const currentEntries = {
      'entry1': { startTime, endTime, entryText}
    }
    expect(
      reducer({entries: currentEntries}, {
        type: types.TIME_ENTRIES_FETCH_LIST,
        isFetching
      })
    ).toEqual({entries: currentEntries, isFetching})
  })

  it('fetching entries from server - success', () => {
    const entries = {}
    const isFetching = false
    
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRIES_FETCH_LIST,
        status: 'success',
        payload: {entries},
        isFetching
      })
    ).toEqual({entries, isFetching})
  })

  it('assign tag to entry', () => {
    const currentEntries = {
      [entryId]: { startTime, endTime, entryText}
    }
    expect(
      reducer({entries: currentEntries}, {
        type: types.TIME_ENTRIES__ASSIGN_TAG_ID,
        isFetching: true
      })
    ).toEqual({entries: currentEntries, isFetching: true})

    const updateEntries = {
      [entryId]: { startTime, endTime, entryText, tagId}
    }
    expect(
      reducer({entries: currentEntries}, {
        type: types.TIME_ENTRIES__ASSIGN_TAG_ID,
        status: 'success',
        payload: {entryId, tagId},
        isFetching: false
      })
    ).toEqual({entries: updateEntries, isFetching: false})    
  })

  it('delete entry', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRIES_REMOVE,
        isFetching: true
      })
    ).toEqual({isFetching: true})

    expect(
      reducer(undefined, {
        type: types.TIME_ENTRIES_REMOVE,
        status: 'success',
        isFetching: false
      })
    ).toEqual({removedSuccess: true, isFetching: false})
  })

})