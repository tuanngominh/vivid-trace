import React from 'react'
import {shallow} from 'enzyme'

import {SendPasswordResetEmail} from '../SendPasswordResetEmail'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<SendPasswordResetEmail />', () => {

  it ('no loading', () => {

    const wrapper = shallow(<SendPasswordResetEmail state={{isFetching: false}}/>)
    expect(wrapper.find('RefreshIndicator').length).toBe(0)
    
  })

  it ('loading', () => {

    const wrapper = shallow(<SendPasswordResetEmail state={{isFetching: true}}/>)
    expect(wrapper.find('RefreshIndicator').length).toBe(1)
    
  })

})
