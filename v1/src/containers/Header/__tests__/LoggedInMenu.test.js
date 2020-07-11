import React from 'react'
import {mount} from 'enzyme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import LoggedInMenu from '../LoggedInMenu'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<LoggedInMenu />', () => {

  const setup = () => {
    //FIXME: check if we need store here
    const emptyReducer = (state = {}, action) => (state)
    const store = createStore(emptyReducer)

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <LoggedInMenu />
        </MuiThemeProvider>
      </Provider>
    )
    return wrapper
  }

  it ('render', () => {

    const wrapper = setup()
    expect(wrapper.find(IconMenu).length).toBe(1)

    //FIXME: can't simulate touchTap event yet to open the menu popup so we can inspect
    // expect(wrapper.find(MenuItem).length).toBe(2)
  })  
})
