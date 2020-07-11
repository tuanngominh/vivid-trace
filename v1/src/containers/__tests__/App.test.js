import React from 'react'
import {mount} from 'enzyme'
import {setupWindowMatchMedia, setupLocalStorage} from '../../test/utils'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import App from '../App'

describe('<App />', () => {
  it ('render', () => {
    setupWindowMatchMedia(true)
    setupLocalStorage()
    
    const emptyReducer = (state = { auth: {
      userLoggedIn: true
    }}, action) => (state)
    const store = createStore(emptyReducer)
    
    const wrapper = mount(<Provider store={store}>
      <App />
    </Provider>)
    expect(wrapper.children().length).toBeGreaterThan(0)

  })

})
