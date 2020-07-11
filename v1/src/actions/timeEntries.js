import firebase from '../configureFirebase'
import * as types from '../constants/ActionTypes'
import {actionStart, actionSuccess, actionFailed} from './utils/template'

export const fetchList = (uid) => {
  return function(dispatch) {
    dispatch(actionStart(types.TIME_ENTRIES_FETCH_LIST))
    
    const ref = firebase.database().ref('timeEntries/' + uid)
    return new Promise((resolve, reject) => {

      // let getTagPromises = []
      ref.once('value', function(snapshot){
        let entries = {}
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          childData.startTime = new Date(childData.startTime)
          childData.endTime = new Date(childData.endTime)
          childData.tagId = childData.tag

          entries[childKey] = childData
        })

        //success when fetch all tags done
        dispatch(actionSuccess(types.TIME_ENTRIES_FETCH_LIST, {payload: {
          entries
        }}))
        resolve()

      })
    })
  }
}

export const remove = (uid, entryId) => {
  return function(dispatch) {
    dispatch(actionStart(types.TIME_ENTRIES_REMOVE, {payload: {entryId}}))
    
    const promise = firebase.database().ref('timeEntries/' + uid + '/' + entryId).remove()
    promise.then(function(){
      dispatch(actionSuccess(types.TIME_ENTRIES_REMOVE))
      dispatch(fetchList(uid))      
    })
    .catch(function(){
      dispatch(actionFailed(types.TIME_ENTRIES_REMOVE))
    })

  }
}