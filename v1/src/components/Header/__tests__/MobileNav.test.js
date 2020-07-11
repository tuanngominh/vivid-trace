import React from 'react'
import {mount} from 'enzyme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import MobileNav from '../MobileNav'

import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import {ToolbarGroup} from 'material-ui/Toolbar'

import LoggedInMenu from '../../../containers/Header/LoggedInMenu'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<MobileNav />', () => {
  const setup = (userLoggedIn) => {
    //FIXME: check if we need store here
    const emptyReducer = (state = {}, action) => (state)
    const store = createStore(emptyReducer)

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <MobileNav userLoggedIn={userLoggedIn} />
        </MuiThemeProvider>
      </Provider>
    )
    return wrapper
  }

  it ('logged in', () => {

    const wrapper = setup(true)

    //FIXME: there are 2 IconButtons from MobilNav menu and 1 from LoggedInMenu
    //haven't found a way to only query the ones from MobileNav
    expect(wrapper.find(IconButton).length).toBe(3)
    expect(wrapper.find(LoggedInMenu).length).toBe(1)

    expect(wrapper.find(FlatButton).length).toBe(0)
  })

  it ('guest', () => {

    const wrapper = setup(false)

    expect(wrapper.find(IconButton).length).toBe(0)
    expect(wrapper.find(LoggedInMenu).length).toBe(0)

    expect(wrapper.find(FlatButton).length).toBe(2)
  })

})
