import React from 'react'
import {shallow} from 'enzyme'
import {setupWindowMatchMedia} from '../../test/utils'

import Profile from '../Profile'

describe('<Profile />', () => {
  it ('render', () => {
    setupWindowMatchMedia(true)
    
    const wrapper = shallow(<Profile />)
    expect(wrapper.children().length).toBe(1)

  })

})
