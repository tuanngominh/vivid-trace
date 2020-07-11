import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {mockFirebase} from '../__mocks__/firebase_for_auth'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../configureFirebase'

import {signout} from '../signout'
import * as types from '../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('signout action', () => {

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.SIGNOUT, isFetching: true },
      { type: types.SIGNOUT, status: 'success', isFetching: false}
    ]
    return store.dispatch(signout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('failed', () => {
    const errorMessage = 'errorMessage'
    firebase.setMockScenarioData({
      mockSuccessCase: true,
      errorMessage
    })

    const store = mockStore({})
    const expectedActions = [
      { type: types.SIGNOUT, isFetching: true },
      { type: types.SIGNOUT, status: 'error', isFetching: false, errorMessage: errorMessage}
    ]
    return store.dispatch(signout())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })  

})