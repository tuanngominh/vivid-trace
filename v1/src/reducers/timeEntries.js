import * as types from '../constants/ActionTypes'

const timeEntries = (state = {}, action) => {
  switch (action.type) {
    case types.TIME_ENTRIES_FETCH_LIST:
      if (action.isFetching && action.isFetching === true) {
        //keep current entries untouch during fetching
        if (state.entries) {
          return {
            ...state,
            isFetching: true
          }
        } 
        //if no entries present then provide empty list
        else {
          return {
            ...state,
            entries: {},
            isFetching: true
          }
        }
      }

      if (action.status && action.status === 'success') {
        return {
          ...state,
          entries: action.payload.entries,
          isFetching: false
        }
      }

      return state

    case types.TIME_ENTRIES__ASSIGN_TAG_ID:
    case types.TIME_ENTRIES__ASSIGN_TAG:
      if (action.isFetching && action.isFetching === true) {
        return {
          ...state,
          isFetching: true
        }
      }
      if (action.status && action.status === 'success') {
        let entry = Object.assign({}, state.entries[action.payload.entryId])
        entry.tagId = action.payload.tagId

        let entries = Object.assign({}, state.entries)
        entries[action.payload.entryId] = entry

        return {
          ...state,
          isFetching: false,
          entries: entries
        }
      }
      return state
      
    case types.TIME_ENTRIES_REMOVE:
      if (action.isFetching && action.isFetching === true) {
        return {
          ...state,
          isFetching: true
        }
      }
      if (action.status && action.status === 'success') {
        return {
          ...state,
          removedSuccess: true, 
          isFetching: false
        }
      }
      return state      

    default :
      return state
  }
}

export default timeEntries