import firebase from '../configureFirebase'
import * as types from '../constants/ActionTypes'
import {actionStart, actionFailed, actionSuccess} from './utils/template'

// Check if user already logged in with current browser
export const sendPasswordResetEmail = (email) => {
  return function(dispatch) {
    dispatch(actionStart(types.SEND_PASSWORD_RESET_EMAIL))
    const promise = firebase.auth().sendPasswordResetEmail(email)
    promise.then(() => {
        dispatch(actionSuccess(types.SEND_PASSWORD_RESET_EMAIL))
      })
      .catch(function(error) {
        dispatch(actionFailed(types.SEND_PASSWORD_RESET_EMAIL, error.message))
      });
    //return promise so github.com/arnaudbenard/redux-mock-store works
    return promise
  }
}

export const verifyPasswordResetCode = (code) => {
  return function(dispatch) {
    dispatch(actionStart(types.VERIFY_PASSWORD_RESET_CODE))
    const promise = firebase.auth().verifyPasswordResetCode(code)
    promise.then((email) => {
        dispatch(actionSuccess(types.VERIFY_PASSWORD_RESET_CODE, {email: email}))
      })
      .catch(function(error) {
        dispatch(actionFailed(types.VERIFY_PASSWORD_RESET_CODE, error.message))
      });
    //return promise so github.com/arnaudbenard/redux-mock-store works
    return promise
  }
}

export const confirmPasswordReset = (code, newPassword) => {
  return function(dispatch) {
    dispatch(actionStart(types.CONFIRM_PASSWORD_RESET))
    const promise = firebase.auth().confirmPasswordReset(code, newPassword)
    promise.then(() => {
        dispatch(actionSuccess(types.CONFIRM_PASSWORD_RESET))
      })
      .catch(function(error) {
        dispatch(actionFailed(types.CONFIRM_PASSWORD_RESET, error.message))
      });
    //return promise so github.com/arnaudbenard/redux-mock-store works
    return promise
  }
}