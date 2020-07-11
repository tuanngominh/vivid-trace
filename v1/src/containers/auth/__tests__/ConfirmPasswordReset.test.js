import React from 'react'
import {shallow} from 'enzyme'

import {ConfirmPasswordReset} from '../ConfirmPasswordReset'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<ConfirmPasswordReset />', () => {

  it ('no loading', () => {

    const wrapper = shallow(<ConfirmPasswordReset state={{isFetching: false}}/>)
    expect(wrapper.find('RefreshIndicator').length).toBe(0)
    
  })

  it ('loading', () => {

    const wrapper = shallow(<ConfirmPasswordReset state={{isFetching: true}}/>)
    expect(wrapper.find('RefreshIndicator').length).toBe(1)
    
  })

})
