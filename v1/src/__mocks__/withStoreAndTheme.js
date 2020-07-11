import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const configStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState ? initialState : {},
    applyMiddleware(
      thunkMiddleware
    )
  )
  return store
}

const withStoreAndTheme = function(WrappedComponent, initialState) {
  const store = configStore(initialState)
  return class extends Component {
    render() {
      return (
        <Provider store={store}>
          <MuiThemeProvider>
            <WrappedComponent {...this.props}></WrappedComponent>
          </MuiThemeProvider>
        </Provider>
      )
    }
  }
}
export default withStoreAndTheme