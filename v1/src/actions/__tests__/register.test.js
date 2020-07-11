import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {mockFirebase} from '../__mocks__/firebase_for_auth'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../configureFirebase'

import {register} from '../register'
import * as types from '../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('register action', () => {

  it('success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true,
      user: {}
    })
    const store = mockStore({})
    const email = 'a1@a.com', password = '123456'
    const expectedActions = [
      { type: types.REGISTER, isFetching: true },
      { type: types.REGISTER, status: 'success', isFetching: false, user: {}}
    ]
    return store.dispatch(register(email, password))
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
    const email = 'a1@a.com', password = '123456'
    const expectedActions = [
      { type: types.REGISTER, isFetching: true },
      { type: types.REGISTER, status: 'error', isFetching: false, errorMessage: errorMessage}
    ]
    return store.dispatch(register(email, password))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })  

})