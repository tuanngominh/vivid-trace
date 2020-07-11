import reducer from '../auth'
import rootReducer from '../index'
import * as types from '../../constants/ActionTypes'

describe('auth reducer', () => {

  it('initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('login success', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN,
        status: 'success'
      })
    ).toEqual({
      type: types.LOGIN,
      status: 'success',
      userLoggedIn: true
    })
  })

  it('login failed', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN,
        status: 'error'
      })
    ).toEqual({
      type: types.LOGIN,
      status: 'error',
      userLoggedIn: false
    })
  })

  it('register success', () => {
    expect(
      reducer(undefined, {
        type: types.REGISTER,
        status: 'success'
      })
    ).toEqual({
      type: types.REGISTER,
      status: 'success',
      userLoggedIn: true
    })
  })

  it('register failed', () => {
    expect(
      reducer(undefined, {
        type: types.REGISTER,
        status: 'error'
      })
    ).toEqual({
      type: types.REGISTER,
      status: 'error',
      userLoggedIn: false
    })
  })

  it('is user logged in - success', () => {
    expect(
      reducer(undefined, {
        type: types.IS_USER_LOGGEDIN,
        status: 'success'
      })
    ).toEqual({
      type: types.IS_USER_LOGGEDIN,
      status: 'success',
      userLoggedIn: true
    })
  })

  it('is user logged in - failed', () => {
    expect(
      reducer(undefined, {
        type: types.IS_USER_LOGGEDIN,
        status: 'error'
      })
    ).toEqual({
      type: types.IS_USER_LOGGEDIN,
      status: 'error',
      userLoggedIn: false
    })
  })  

  it('signout will reset all state', () => {
    const startTime = new Date(Date.UTC(2015, 1, 12, 20, 20, 0))
    const endTime = new Date(Date.UTC(2015, 1, 12, 22, 20, 0))
    const loggedInState = {
      timeEntryInput: {
        startTime : startTime.getTime(),
        endTime : endTime.getTime()
      }
    }
    const state = rootReducer(loggedInState, {
      type: types.SIGNOUT,
      status: 'success'
    })
    expect(state.timeEntryInput).toEqual({})
  })

  it('signout failed does\'t change current logged in status', () => {
    let userLoggedIn = true
    expect(
      reducer({
        userLoggedIn
      }, {
        type: types.SIGNOUT,
        status: 'error'
      })
    ).toEqual({
      isFetching: false,
      userLoggedIn
    })

    userLoggedIn = false
    expect(
      reducer({
        userLoggedIn
      }, {
        type: types.SIGNOUT,
        status: 'error'
      })
    ).toEqual({
      isFetching: false,
      userLoggedIn
    })
  })

})