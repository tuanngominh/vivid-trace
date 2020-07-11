import * as types from '../constants/ActionTypes'
import {combineReducers} from 'redux'

const verifyPasswordResetCode = (state = {}, action) => {
  switch (action.type) {
    case types.VERIFY_PASSWORD_RESET_CODE:
      return { 
        ...action, 
        userLoggedIn: false
      }
    default:
      return state
  }
}

const confirmPasswordReset = (state = {}, action) => {
  switch (action.type) {
    case types.CONFIRM_PASSWORD_RESET:
      return { 
        ...action, 
        userLoggedIn: false
      }
    default:
      return state
  }
}

const sendPasswordResetEmail = (state = {}, action) => {
  switch (action.type) {
    case types.SEND_PASSWORD_RESET_EMAIL:
      return { 
        ...action, 
        userLoggedIn: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  verifyPasswordResetCode,
  confirmPasswordReset,
  sendPasswordResetEmail
})

export default rootReducer