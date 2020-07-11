import React from 'react'
import {shallow, mount} from 'enzyme'

import withStoreAndTheme from '../../__mocks__/withStoreAndTheme'
import withTheme from '../../__mocks__/withTheme'

import CheckAuth_withConnect, {CheckAuth} from '../CheckAuth'


// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const uid = '123'
const CheckAuth_withStoreAndTheme = withStoreAndTheme(CheckAuth_withConnect, {
  auth: {
    user: {
      uid
    }
  }
})
const CheckAuth_withTheme = withTheme(CheckAuth)

describe('<CheckAuth />', () => {
  it ('render with store and theme', () => {
    const wrapper = mount(<CheckAuth_withStoreAndTheme />)
  })

  it ('render', () => {
    const props = {
      onCheckIsUserLoggedIn: jest.fn()
    }
    const wrapper = mount(<CheckAuth_withTheme {...props} />)
    
    expect(props.onCheckIsUserLoggedIn).toHaveBeenCalledTimes(1)
  })

})
