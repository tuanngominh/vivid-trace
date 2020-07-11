import firebase from '../configureFirebase'
import * as types from '../constants/ActionTypes'
import {actionStart, actionFailed, actionSuccess} from './utils/template'

// Check if user already logged in with current browser
export const isUserLoggedIn = () => {
  return function(dispatch) {
    dispatch(actionStart(types.IS_USER_LOGGEDIN))

    //return promise so github.com/arnaudbenard/redux-mock-store works
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch(actionSuccess(types.IS_USER_LOGGEDIN, {user:user}))
          resolve()
        } else {          
          dispatch(actionFailed(types.IS_USER_LOGGEDIN))
          resolve()
        }
      })
    })
  }
}