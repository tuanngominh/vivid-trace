import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'

import {Provider} from 'react-redux'
import configureStore from '../src/store/configureStore'

import Login from '../src/containers/auth/Login'
import {Register} from '../src/containers/auth/Register'
import {SendPasswordResetEmail} from '../src/containers/auth/SendPasswordResetEmail'
import {ConfirmPasswordReset} from '../src/containers/auth/ConfirmPasswordReset'
import {VerifyPasswordResetCode} from '../src/containers/auth/VerifyPasswordResetCode'

storiesOf('Authentication', module)
  .add('<Register />', () => {
    const store = configureStore()
    return (
      <Provider store={store}>
        <div style={{margin: 40}}>
          <Register />
        </div>
      </Provider>
    )
  })
  .add('<Login />', () => {
    const store = configureStore()
    return (
      <Provider store={store}>
        <div style={{margin: 40}}>
          <Login />
        </div>
      </Provider>
    )
  })
  .add('<SendPasswordResetEmail />', () => {
    const store = configureStore()
    const props = {
      state: {
        isFetching: false
      }
    }    
    return (
      <Provider store={store}>
        <div style={{margin: 40}}>
          <SendPasswordResetEmail {...props} />
        </div>
      </Provider>
    )
  })
  .add('<VerifyPasswordResetCode />', () => {
    const store = configureStore()
    const props = {
      location: {
        query: {
          oobCode: 'code-example'
        }
      },
      onVerifyPasswordResetCode: function() {

      },
      state: {
        isFetching: false
      }
    }
    return (
      <Provider store={store}>
        <div style={{margin: 40}}>
          <VerifyPasswordResetCode {...props} />
        </div>
      </Provider>
    )
  })
  .add('<ConfirmPasswordReset />', () => {
    const store = configureStore()
    const props = {
      state: {
        isFetching: false
      }
    }
    return (
      <Provider store={store}>
        <div style={{margin: 40}}>
          <ConfirmPasswordReset {...props} />
        </div>
      </Provider>
    )
  })
