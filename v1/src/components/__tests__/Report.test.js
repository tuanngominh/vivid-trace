import React from 'react'
import {shallow} from 'enzyme'

import {Report} from '../Report'

describe('<Report />', () => {
  it ('render', () => {
    //setup window.matchMedia
    window.matchMedia = () => {
      return true
    }
    const wrapper = shallow(<Report />)
  })

})
