import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import mockFirebase from '../../__mocks__/timeEntryInput/firebase_for_pull_action'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../../configureFirebase'

import {pull} from '../../timeEntryInput'
import * as types from '../../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
describe('TimEntryInput - pull action', () => {

  const uid = '123'
  const text = "text"
  const startTime = new Date()

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true,
      text,
      startTime
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__PULL, isFetching: true},
      { type: types.TIME_ENTRY_INPUT__PULL, status: 'success', isFetching: false, payload: {startTime,  text}}
    ]
    return store.dispatch(pull(uid))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('no current tracking entry on server', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: false
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__PULL, isFetching: true},
      { type: types.TIME_ENTRY_INPUT__PULL, isFetching: false, status: 'success', payload: null}
    ]
    return store.dispatch(pull(uid))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

})