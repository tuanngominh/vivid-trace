//TODO: extract module import to a common code
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import mockFirebase from '../../__mocks__/timeEntryInput/firebase_for_start_action'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../../configureFirebase'

import {start} from '../../timeEntryInput'
import * as types from '../../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
describe('TimEntryInput - start action', () => {

  const uid = '123'
  const text = "text"
  const startTime = new Date()

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.TIME_ENTRY_INPUT__START, isFetching: true, payload: {startTime,  text}},
      { type: types.TIME_ENTRY_INPUT__START, status: 'success', isFetching: false, payload: {startTime,  text}}
    ]
    return store.dispatch(start(uid, text, startTime))
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
      { type: types.TIME_ENTRY_INPUT__START, isFetching: true, payload: {startTime,  text}},
      { type: types.TIME_ENTRY_INPUT__START, status: 'error', isFetching: false}
    ]
    return store.dispatch(start(uid, text, startTime))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })  

})