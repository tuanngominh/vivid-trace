import React from 'react'
import {mount} from 'enzyme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux'
import configureStore from '../../../store/configureStore'

import Login from '../Login'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const setup = () => {
  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider>
        <Login />
      </MuiThemeProvider>
    </Provider>
    )
  return wrapper
}

describe('<Login />', () => {

  it ('render', () => {

    const wrapper = setup()

    expect(wrapper.find('FormsyText').length).toBe(2)
    expect(wrapper.find('RaisedButton').length).toBe(1)
  })

  it ('invalid data', () => {
    const wrapper = setup()
    let wrongEmail = 'a@a', emptyPass = ''
    wrapper.find('input[name="email"]').simulate('change', {target: {value: wrongEmail}})
    wrapper.find('input[name="password"]').simulate('change', {target: {value: emptyPass}})
    wrapper.find('Formsy').simulate('submit')
    //FIXME: need to verify invalidate handler

    let goodEmail = 'joe@example.com', goodPass = 'password1'
    wrapper.find('input[name="email"]').simulate('change', {target: {value: goodEmail}})
    wrapper.find('input[name="password"]').simulate('change', {target: {value: goodPass}})
    wrapper.find('Formsy').simulate('submit')
    //FIXME: need to verify validate handler

  })
})
