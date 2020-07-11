import * as types from '../constants/ActionTypes'

const report = (state = {}, action) => {
  switch (action.type) {
    case types.REPORT_FETCH:
      if ('isFetching' in action && action.isFetching === true) {
        const {startDate, endDate} = action.payload
        return {
          isFetching: true, 
          entries: {},
          startDate,
          endDate
        }
      }

      if (action.status && action.status === 'success') {
        const {entries, startDate, endDate} = action.payload
        return {          
          isFetching: false,
          entries,
          startDate,
          endDate
        }
      }

      return state

    default :
      return state
  }
}

export default report