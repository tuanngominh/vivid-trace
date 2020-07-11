import React from 'react'
import {shallow} from 'enzyme'

import {setupWindowMatchMedia, setupLocalStorage} from '../../test/utils'

import Root, {basename} from '../Root'
import history from '../../history'

import configureStore from '../../store/configureStore'

describe('<Root />', () => {
  setupLocalStorage()
  
  it ('render', () => {
    setupWindowMatchMedia(true)


    const wrapper = shallow(<Root store={configureStore()} history={history} />)

    expect(wrapper.children().length).toBeGreaterThan(0)
  })
  
})
