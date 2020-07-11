import React from 'react'
import {shallow} from 'enzyme'

import CreateTagForm from '../CreateTagForm'
import ColorPicker from '../ColorPicker'

describe('CreateTagForm', () => {
  it('can render', () => {
    const props = {
      onSave: jest.fn()
    }
    const wrapper = shallow(<CreateTagForm {...props} />)
    expect(wrapper.find(ColorPicker).length).toBe(1)
  })

  it('can chang tag name', () => {
    const props = {
      onSave: jest.fn()
    }
    const wrapper = shallow(<CreateTagForm {...props} />)
    const newTagName = 'new tag name'
    wrapper.instance().handleChange({target: {value: newTagName}})
    expect(wrapper.state().tagName).toBe(newTagName)
  })
})