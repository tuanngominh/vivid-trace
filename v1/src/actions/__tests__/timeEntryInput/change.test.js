import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import mockFirebase from '../../__mocks__/timeEntryInput/firebase_for_change_action'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../../configureFirebase'

import {changeStartTime, changeText} from '../../timeEntryInput'
import * as types from '../../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
describe('TimEntryInput - changeStartTime action', () => {

  const uid = '123'
  const text = "text"
  const startTime = new Date()

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__CHANGE_START_TIME, isFetching: true, payload: {startTime}},
      { type: types.TIME_ENTRY_INPUT__CHANGE_START_TIME, status: 'success', isFetching: false, payload: {startTime}}
    ]
    return store.dispatch(changeStartTime(uid, startTime))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('failed', () => {
    const errorMessage = 'errorMessage'
    firebase.setMockScenarioData({
      mockSuccessCase: false,
      errorMessage
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__CHANGE_START_TIME, isFetching: true, payload: {startTime}},
      { type: types.TIME_ENTRY_INPUT__CHANGE_START_TIME, status: 'error', isFetching: false}
    ]
    return store.dispatch(changeStartTime(uid, startTime))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })  

})

describe('TimEntryInput - changeText action', () => {

  const uid = '123'
  const text = "text"
  const startTime = new Date()

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__CHANGE_TEXT, isFetching: true, payload: {text}},
      { type: types.TIME_ENTRY_INPUT__CHANGE_TEXT, status: 'success', isFetching: false, payload: {text}}
    ]
    return store.dispatch(changeText(uid, text))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('failed', () => {
    const errorMessage = 'errorMessage'
    firebase.setMockScenarioData({
      mockSuccessCase: false,
      errorMessage
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__CHANGE_TEXT, isFetching: true, payload: {text}},
      { type: types.TIME_ENTRY_INPUT__CHANGE_TEXT, status: 'error', isFetching: false}
    ]
    return store.dispatch(changeText(uid, text))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })  

})