import firebase from '../configureFirebase'
import * as types from '../constants/ActionTypes'
import {actionStart, actionSuccess, actionFailed} from './utils/template'

export const fetchList = (uid) => {
  return function(dispatch) {
    dispatch(actionStart(types.TAGS_FETCH_LIST))
    
    const ref = firebase.database().ref('tags/' + uid)
    return new Promise(function(resolve, reject){
      ref.once('value', function(snapshot){
        let entries = []
        snapshot.forEach(function(childSnapshot){
          entries.push(Object.assign(childSnapshot.val(), {key : childSnapshot.key}))
        })
        dispatch(actionSuccess(types.TAGS_FETCH_LIST, {payload: entries}))

        resolve()
      })
    })
  }
}

/*
Get tag if existed or create new tag then assign to entry by calling a callback
@param integer uid user id
@param string tagName tag name
@param string tagColor tag color
@param function assignFn callback to call to assign tag to entry
*/
const assignTagToEntry = (dispatch, uid, tagName, tagColor, assignFn) => {
  //use existed tag
  const ref = firebase.database().ref('tags/' + uid)
    .orderByChild('name')
      .startAt(tagName)
      .endAt(tagName)

  ref.once('value', function(snapshot){
    let tags = snapshot.val()
    //tag exist so return error
    if (tags) {
      const tagId = Object.keys(tags)[0]
      assignFn(tagId)
    } else {
      const tag = {
        name: tagName,
        color: tagColor
      }        
      //create tag
      const newTagPromise = firebase.database().ref('tags/' + uid).push(tag)
      const tagId = newTagPromise.key
      newTagPromise
      .then(() => {
        assignFn(tagId)
        dispatch(fetchList(uid))
      })      
    }
  })  
}

export const assignTagToTimeEntryInput = (uid, tagName, tagColor) => {
  return function(dispatch) {
    const assignFn = (tagId) => {
      //assign tag to entry
      const promise = firebase.database().ref('timeEntryInputs/' + uid).update({tag: tagId})
      promise
      .then(() => {
        dispatch(actionSuccess(types.TIME_ENTRY_INPUT__ASSIGN_TAG, {payload: {
          tagId
        }}))
      })
      .catch(() => {
        dispatch(actionFailed(types.TIME_ENTRY_INPUT__ASSIGN_TAG))  
      })
    }

    dispatch(actionStart(types.TIME_ENTRY_INPUT__ASSIGN_TAG))

    assignTagToEntry(dispatch, uid, tagName, tagColor, assignFn)
  }
}

export const assignTagIdToTimeEntryInput = (uid, tagId) => {
  return dispatch => {
    dispatch(actionStart(types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID, {payload: {
      tagId
    }}))

    const promise = firebase.database().ref('timeEntryInputs/' + uid).update({tag: tagId})

    promise
    .then(() => {      
      firebase.database().ref('tags/' + uid + '/' + tagId).once('value', (snapshot) => {
        dispatch(actionSuccess(types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID, {payload: {
          tagId
        }}))
      })
    })
    .catch(() => {
      dispatch(actionFailed(types.TIME_ENTRY_INPUT__ASSIGN_TAG_ID))  
    })

    return promise
  }
}

export const assignTagToTimeEntry = (uid, entryId, tagName, tagColor) => {
  return function(dispatch) {
    const assignFn = (tagId) => {
      //assign tag to entry
      const promise = firebase.database().ref('timeEntries/' + uid + '/' + entryId).update({tag: tagId})
      promise
      .then(() => {
        dispatch(actionSuccess(types.TIME_ENTRIES__ASSIGN_TAG, {payload: {
          tagId,
          entryId
        }}))
      })
      .catch(() => {
        dispatch(actionFailed(types.TIME_ENTRIES__ASSIGN_TAG))  
      })
    }

    dispatch(actionStart(types.TIME_ENTRIES__ASSIGN_TAG))

    assignTagToEntry(dispatch, uid, tagName, tagColor, assignFn)
  }
}

export const assignTagIdToTimeEntry = (uid, entryId, tagId) => {
  return dispatch => {
    dispatch(actionStart(types.TIME_ENTRIES__ASSIGN_TAG_ID))

    const promise = firebase.database().ref('timeEntries/' + uid + '/' + entryId).update({tag: tagId})

    promise
    .then(() => {      
      firebase.database().ref('tags/' + uid + '/' + tagId).once('value', (snapshot) => {
        dispatch(actionSuccess(types.TIME_ENTRIES__ASSIGN_TAG_ID, {payload: {
          tagId,
          entryId
        }}))
      })
    })
    .catch(() => {
      dispatch(actionFailed(types.TIME_ENTRIES__ASSIGN_TAG_ID))  
    })

    return promise
  }
}