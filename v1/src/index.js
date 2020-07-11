import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

import history from './history'

import configureStore from './store/configureStore'

import '../node_modules/flexboxgrid/dist/flexboxgrid.min.css'
import './index.css';

const store = configureStore()

const requireAuth = (nextState, replace) => {
  const state = store.getState()
  if (!state.auth.userLoggedIn) {
    replace({
      pathname: '/check-auth',
      state: { nextPathname: nextState.location.pathname }
    })    
  }
}

ReactDOM.render(
  <Root store={store} history={history} requireAuth={requireAuth} />,
  document.getElementById('root')
);
