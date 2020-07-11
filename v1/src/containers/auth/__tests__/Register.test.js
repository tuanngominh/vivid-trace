import React from 'react'
import {mount} from 'enzyme'

import {setupLocalStorage} from '../../../test/utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DecoreatedRegister, {Register} from '../Register'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<Register />', () => {
  setupLocalStorage()

  it ('render', () => {
    const wrapper = mount(<MuiThemeProvider><Register /></MuiThemeProvider>)
    expect(wrapper.find('FormsyText').length).toBe(2)
    expect(wrapper.find('RaisedButton').length).toBe(1)
    expect(wrapper.find('RefreshIndicator').length).toBe(0)
  })

  it ('render with loading', () => {
    const wrapper = mount(<MuiThemeProvider><Register isFetching={true} /></MuiThemeProvider>)
    expect(wrapper.find('RefreshIndicator').length).toBe(1)
  })

})
