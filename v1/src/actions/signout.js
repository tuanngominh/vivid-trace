import firebase from '../configureFirebase'
import history from '../history'
import * as types from '../constants/ActionTypes'
import {actionStart, actionFailed, actionSuccess} from './utils/template'

export const signout = () => {
  return function(dispatch) {
    dispatch(actionStart(types.SIGNOUT))
    
    const promise = firebase.auth().signOut()
    promise.then(function(){
      dispatch(actionSuccess(types.SIGNOUT))
      history.push('/login')
    })
    .catch(function(){
      dispatch(actionFailed(types.SIGNOUT))
    })

    //return promise so github.com/arnaudbenard/redux-mock-store works
    return promise
  }
}