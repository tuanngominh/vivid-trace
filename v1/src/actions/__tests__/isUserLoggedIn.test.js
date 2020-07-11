import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {mockFirebase} from '../__mocks__/firebase_for_auth'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../configureFirebase'

import {isUserLoggedIn} from '../isUserLoggedIn'
import * as types from '../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('isUserLoggedIn action', () => {

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true,
      user: {}
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.IS_USER_LOGGEDIN, isFetching: true },
      { type: types.IS_USER_LOGGEDIN, status: 'success', isFetching: false, user: {}}
    ]
    return store.dispatch(isUserLoggedIn())
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
      { type: types.IS_USER_LOGGEDIN, isFetching: true },
      { type: types.IS_USER_LOGGEDIN, status: 'error', isFetching: false, errorMessage: errorMessage}
    ]
    return store.dispatch(isUserLoggedIn())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })  

})