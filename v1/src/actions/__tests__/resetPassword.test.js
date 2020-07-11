import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {mockFirebase} from '../__mocks__/firebase_for_auth'
jest.mock('firebase/app', () => { return mockFirebase()})
jest.mock('firebase/auth', () => {})
jest.mock('firebase/database', () => {})
import firebase from '../../configureFirebase'
import {sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset} from '../resetPassword'
import * as types from '../../constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const errorMessage = 'errorMessage'
const email = 'a@a.com'
const code = 'somecode'
const newPassword = '123456'

describe('sendPasswordResetEmail', () => {

  it('should success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.SEND_PASSWORD_RESET_EMAIL, isFetching: true },
      { type: types.SEND_PASSWORD_RESET_EMAIL, status: 'success', isFetching: false}
    ]
    return store.dispatch(sendPasswordResetEmail(email))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('should failed', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: false,
      errorMessage: errorMessage
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.SEND_PASSWORD_RESET_EMAIL, isFetching: true },
      { type: types.SEND_PASSWORD_RESET_EMAIL, status: 'error', isFetching: false, errorMessage: errorMessage}
    ]
    return store.dispatch(sendPasswordResetEmail())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })  

})

describe('verifyPasswordResetCode', () => {
  
  it('should success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true,
      email : email
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.VERIFY_PASSWORD_RESET_CODE, isFetching: true },
      { type: types.VERIFY_PASSWORD_RESET_CODE, status: 'success', isFetching: false, "email": email}
    ]

    return store.dispatch(verifyPasswordResetCode(code))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('should failed', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: false,
      errorMessage: errorMessage
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.VERIFY_PASSWORD_RESET_CODE, isFetching: true },
      { type: types.VERIFY_PASSWORD_RESET_CODE, status: 'error', isFetching: false, errorMessage: errorMessage}
    ]
    return store.dispatch(verifyPasswordResetCode(code))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)        
      })    
  })  

})

describe('confirmPasswordReset', () => {
  
  it('should success', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: true
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.CONFIRM_PASSWORD_RESET, isFetching: true },
      { type: types.CONFIRM_PASSWORD_RESET, status: 'success', isFetching: false}
    ]

    return store.dispatch(confirmPasswordReset(code, newPassword))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    
  })

  it('should failed', () => {
    firebase.setMockScenarioData({
      mockSuccessCase: false,
      errorMessage: errorMessage
    })
    const store = mockStore({})
    const expectedActions = [
      { type: types.CONFIRM_PASSWORD_RESET, isFetching: true },
      { type: types.CONFIRM_PASSWORD_RESET, status: 'error', isFetching: false, errorMessage: errorMessage}
    ]
    return store.dispatch(confirmPasswordReset(code, newPassword))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)        
      })    
  })  

})