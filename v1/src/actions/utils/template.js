export const actionFailed = (actionType, errorMessage, object) => {
  let action = {
    type: actionType,
    status: 'error',
    isFetching: false
  }

  if (errorMessage) {
    action.errorMessage = errorMessage
  }
  if (object) {
    action = Object.assign(action, object)
  }
  return action
}

export const actionStart = (actionType, object) => {
  return Object.assign({
    type: actionType,
    isFetching: true
  }, object)
}

export const actionSuccess = (actionType, object) => {
  return Object.assign({
    type: actionType,
    status: 'success',
    isFetching: false
  }, object)
}