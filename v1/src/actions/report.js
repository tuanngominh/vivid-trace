import firebase from '../configureFirebase'
import * as types from '../constants/ActionTypes'
import {actionStart, actionSuccess} from './utils/template'

// Fetch report data
export const fetch = (uid, text, startDate, endDate) => {
  return function(dispatch) {
    dispatch(actionStart(types.REPORT_FETCH, {payload: {
      startDate,
      endDate
    }}))

    const ref = firebase.database().ref('timeEntries/' + uid)
      .orderByChild('startTime')
        .startAt(startDate)
        .endAt(endDate)

    return new Promise(function(resolve, reject){      
      ref.once('value', function(snapshot){

        const dispatchActionSuccess = (entries) => {
          dispatch(actionSuccess(types.REPORT_FETCH, {payload: {
            entries,
            startDate,
            endDate
          }}))
          resolve()          
        }

        let entries = snapshot.val()
        if (!entries) {
          dispatchActionSuccess([])
        }

        let filteredEntries = {}

        for (let key in entries) {
          if (entries.hasOwnProperty(key)) {
            //filter text on clientside
            if (text) {
              if (entries[key].text.indexOf(text) !== -1) {
                filteredEntries[key] = entries[key]
              }            
            }
          }
        }

        if (text) {
          entries = filteredEntries
        }

        if (!entries) {
          dispatchActionSuccess([])
        }
        
        //add tag detail for entry
        let tagPromises = []
        Object.keys(entries).forEach(key => {
          let entry = entries[key]
          if (entry.tag) {
            const promise = firebase.database().ref('tags/' + uid + '/' + entry.tag).once('value', snapshot => {
              entry.tagName = snapshot.val().name
              entry.tagColor = snapshot.val().color
            })
            tagPromises.push(promise)
          }
        })
        
        Promise.all(tagPromises).then(() => {
          dispatchActionSuccess(entries)
        })

      })
    })
  }
}