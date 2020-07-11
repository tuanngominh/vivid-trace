import firebase from '../configureFirebase'
import * as types from '../constants/ActionTypes'
import {actionStart, actionFailed, actionSuccess} from './utils/template'

export const login = (email, password) => {
  return function(dispatch) {
    dispatch(actionStart(types.LOGIN))
    const promise = firebase.auth().signInWithEmailAndPassword(email, password)
    promise.then((user) => {
        dispatch(actionSuccess(types.LOGIN, {user: user}))
      })
      .catch(function(error) {
        let errorMessage

        switch (error.code) {
          case 'auth/weak-password':
            errorMessage = 'The password is too weak.'
            break
          default:
            errorMessage = error.message
        }
        dispatch(actionFailed(types.LOGIN, errorMessage))
      });
    //return promise so github.com/arnaudbenard/redux-mock-store works
    return promise
  }
}