import * as types from '../constants/ActionTypes'

const auth = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN: 
      if (action.status === 'success') {
        return { 
          ...action, 
          userLoggedIn: true
        }
      } else {
        return {
          ...action,
          userLoggedIn: false
        }
      }

    case types.REGISTER:
      if (action.status === 'success') {
        return {
          ...action,
          userLoggedIn: true
        }
      } else {
        return {
          ...action,
          userLoggedIn: false
        }
      }

    case types.IS_USER_LOGGEDIN:
      if (action.status === 'success') {
        return {
          ...action,
          userLoggedIn: true
        }
      } else if ('isFetching' in action && action.isFetching) {
        return Object.assign({}, state, {isFetching: action.isFetching})
      } else {
        return {
          ...action,
          userLoggedIn: false
        }
      }

    case types.SIGNOUT:
      if (action.isFetching === true) {
        return {
          ...state,
          isFetching: true
        }
      }
      if (action.status === 'error') {
        return {
          ...state,
          isFetching: false
        }
      }
      return state

    default :
      return state
  }
}

export default auth