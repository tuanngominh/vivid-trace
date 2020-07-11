import React from 'react'
import {mount} from 'enzyme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import DesktopNav from '../DesktopNav'

import FlatButton from 'material-ui/FlatButton'
import LoggedInMenu from '../../../containers/Header/LoggedInMenu'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<DesktopNav />', () => {
  const setup = (userLoggedIn) => {
    //FIXME: check if we need store here
    const emptyReducer = (state = {}, action) => (state)
    const store = createStore(emptyReducer)

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <DesktopNav userLoggedIn={userLoggedIn} />
        </MuiThemeProvider>
      </Provider>
    )
    return wrapper
  }

  it ('logged in', () => {
    const wrapper = setup(true)
    
    //two menu buttons
    expect(wrapper.find(FlatButton).length).toBe(2)
    expect(wrapper.find(LoggedInMenu).length).toBe(1)
    
  })

  it ('guest', () => {

    const wrapper = setup(false)
    //1 login button
    expect(wrapper.find(FlatButton).length).toBe(2)
    expect(wrapper.find(LoggedInMenu).length).toBe(0)
    
  })

})
