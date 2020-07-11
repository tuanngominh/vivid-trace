import React from 'react'
import {shallow, mount} from 'enzyme'
import ColorPicker, {ColorPickerItem} from '../ColorPicker'
import withTheme from '../../__mocks__/withTheme'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('Color Picker Item', () => {
  it('can render', () => {
    const wrapper = shallow(<ColorPickerItem />)
  })

  it('can render selected', () => {
    const wrapper = shallow(<ColorPickerItem selected={true} />)
  })

  it('click to select color', () => {
    const props = {
      onClick: jest.fn(),
      color: 'black'
    }
    const wrapper = shallow(<ColorPickerItem {...props} />)
    wrapper.instance().handleClick()
    expect(props.onClick).toHaveBeenCalledWith(props.color)
  })
})

const ColorPicker_withTheme = withTheme(ColorPicker)
describe('Color Picker', () => {
  it('can render', () => {
    const wrapper = shallow(<ColorPicker />)
  })

  it('have the right number of item', () => {
    const props = {
      availableColors: ['black', 'blue', 'green', 'red'],
      itemPerRow: 3
    }
    const wrapper = mount(<ColorPicker_withTheme {...props} />)
    expect(wrapper.find(ColorPickerItem).length).toBe(props.availableColors.length)
  })

  it('can handle click to select color', () => {
    const wrapper = shallow(<ColorPicker />)
    const color = 'black'
    wrapper.instance().handleClick(color)
    expect(wrapper.instance().getValue()).toBe(color)
  })  
})