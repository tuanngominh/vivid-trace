import * as types from '../constants/ActionTypes'

const tags = (state = {}, action) => {
  switch (action.type) {
    case types.TAGS_FETCH_LIST:
      if (action.isFetching && action.isFetching === true) {
        return {
          tags: [],
          isFetching: true
        }
      }

      if (action.status && action.status === 'success') {
        return { 
          tags: action.payload,
          isFetching: false
        }
      }

      return state

    default :
      return state
  }
}

export default tags