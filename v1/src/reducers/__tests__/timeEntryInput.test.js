import reducer from '../timeEntryInput'
import * as types from '../../constants/ActionTypes'

describe('timeEntryInput reducer', () => {

  it('initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  const uid = '123'
  const text = "text"
  const startTime = (new Date()).toJSON()
  const isFetching = false
  const tagId = 'tag1'

  it('start entry input without tag', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__START,
        status: 'success',
        payload: {text, startTime},
        isFetching
      })
    ).toEqual({text, startTime, isFetching})
  })

  it('start entry input with tag', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__START,
        status: 'success',
        payload: {text, startTime, tagId},
        isFetching
      })
    ).toEqual({text, startTime, isFetching, tagId})
  })

  it('pull entry input without tag from server', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__PULL,
        status: 'success',
        payload: {text, startTime},
        isFetching
      })
    ).toEqual({text, startTime, isFetching})
  })

  it('pull entry input with tag from server', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__PULL,
        status: 'success',
        payload: {text, startTime, tagId},
        isFetching
      })
    ).toEqual({text, startTime, isFetching, tagId})
  })

  it('entry input - change start time - success', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__CHANGE_START_TIME,
        status: 'success',
        payload: {startTime},
        isFetching
      })
    ).toEqual({startTime, isFetching})
  })

  it('entry input - change text - success', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__CHANGE_TEXT,
        status: 'success',
        payload: {text},
        isFetching
      })
    ).toEqual({text, isFetching})
  })

  it('create new tag and assign to current time tracking', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__ASSIGN_TAG,
        isFetching: true
      })
    ).toEqual({isFetching: true})

    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__ASSIGN_TAG,
        status: 'success',
        payload: {tagId},
        isFetching: false
      })
    ).toEqual({isFetching: false, tagId})    
  })

  it('assign tag to current time tracking', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID,
        payload: {tagId},
        isFetching: true
      })
    ).toEqual({isFetching: true, tagId})

    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID,
        status: 'success',
        payload: {tagId},
        isFetching: false
      })
    ).toEqual({isFetching: false, tagId})    
  })  

  it('assign tag to current time tracking', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID,
        payload: {tagId},
        isFetching: true
      })
    ).toEqual({isFetching: true, tagId})

    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID,
        status: 'success',
        payload: {tagId},
        isFetching: false
      })
    ).toEqual({isFetching: false, tagId})    
  })

  it('delete current time tracking', () => {
    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__REMOVE,
        isFetching: true
      })
    ).toEqual({isFetching: true})

    expect(
      reducer(undefined, {
        type: types.TIME_ENTRY_INPUT__REMOVE,
        status: 'success',
        isFetching: false
      })
    ).toEqual({
      isFetching: false,
      removedSuccess: true
    })    
  })  
})