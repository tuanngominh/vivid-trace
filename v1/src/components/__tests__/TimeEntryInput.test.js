jest.useFakeTimers()
import React from 'react'
import {shallow, mount} from 'enzyme'
import TimeEntryInput_withConnect, {TimeEntryInput} from '../TimeEntryInput'
import withStoreAndTheme from '../../__mocks__/withStoreAndTheme'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const TimeEntryInput_withStoreAndTheme = withStoreAndTheme(TimeEntryInput)

const now = new Date()
//earlier than now 20 minutes
const startTime = new Date((now).setMinutes(now.getMinutes() - 20))
const text = 'text123'

const tagId = 'tag1'
const setupActionProps = () => ({
  onStart: jest.fn(),
  onSelectTag: jest.fn()
})

const changeEntryTextValue = (wrapper, newText) => {
  const input = wrapper.find('input[name="text"]')
  input.node.value = newText
  input.simulate('change', input)
}

describe('<TimeEntryInput />', () => {
  it ('render', () => {
    const wrapper = shallow(<TimeEntryInput />)
    expect(wrapper.children().length).toBeGreaterThan(0)    
  })

  const setupComponent = () => {
    const props = setupActionProps()
    const wrapper = shallow(<TimeEntryInput {...props} />)
    return {props, wrapper}
  }
  it('start time tracking without description and tag', () => {
    it(('without description and tag'), () => {
      const {props, wrapper} = setupComponent()
      wrapper.find('FlatButton').simulate('click', { preventDefault() {} })
      expect(props.onStart).toHaveBeenCalledTimes(1)
    })
    it(('with description and without tag'), () => {
      const {props, wrapper} = setupComponent()
      const description = 'description'
      changeEntryTextValue(wrapper, description)
      wrapper.find('FlatButton').simulate('click', { preventDefault() {} })
      expect(props.onStart).toHaveBeenCalledWith(description)
    })
    it(('with description and tag'), () => {
      const {props, wrapper} = setupComponent()
      const description = 'description'
      const tagId = 'tag1'
      changeEntryTextValue(wrapper, description)
      wrapper.instance().handleSelectTag(tagId)
      wrapper.find('FlatButton').simulate('click', { preventDefault() {} })
      expect(props.onStart).toHaveBeenCalledWith(description, tagId)
    })
    it(('start by click the button'), () => {
      const {props, wrapper} = setupComponent()
      wrapper.instance().handleStart({ preventDefault() {} })
      expect(props.onStart).toHaveBeenCalledTimes(1)
    })
  })

  it('Can start by press enter key', () => {
    const {props, wrapper} = setupComponent()
    const text = 'time entry description'
    wrapper.setState({
      text
    })
    wrapper.instance().handleKeyPress({nativeEvent: {keyCode: 13}})
    expect(props.onStart).toHaveBeenCalledWith(text)
  })

  it('when press enter key, will not start again if already start', () => {
    const {props, wrapper} = setupComponent()
    const text = 'time entry description'
    wrapper.setState({
      startTime: (new Date()).getTime()
    })
    wrapper.instance().handleKeyPress({nativeEvent: {keyCode: 13}})
    expect(props.onStart).toHaveBeenCalledTimes(0)
  })  

  it('Can specify tag before start tracking new item', () => {
    const actionProps = setupActionProps()
    const wrapper = shallow(<TimeEntryInput {...actionProps} />)
    wrapper.instance().handleSelectTag(tagId)
    expect(wrapper.state().tagId).toBe(tagId)
  })

  it('Can specify tag for current start tracking item', () => {
    const actionProps = setupActionProps()
    const startTime = (new Date()).getTime()
    const wrapper = shallow(<TimeEntryInput startTime={startTime} {...actionProps} />)
    wrapper.instance().handleSelectTag(tagId)
    expect(actionProps.onSelectTag).toHaveBeenCalledWith(tagId)
  })

  it('open time dialog', () => {
    const props = {
      onOpenDialog: jest.fn()
    }
    const wrapper = shallow(<TimeEntryInput {...props} />)
    wrapper.find('span').simulate('click')
    expect(props.onOpenDialog).toHaveBeenCalledTimes(1)
  })

  it('stop time tracking', () => {
    const props = {
      startTime,
      onStop: jest.fn()
    }

    const wrapper = mount(<TimeEntryInput_withStoreAndTheme {...props} />)
    //Stop button is a RaisedButton which include an EnhancedButton
    const stopButton = wrapper.findWhere(n => {
      return (
        (n.name() === 'EnhancedButton') 
        && 
        (n.prop('name') === 'btn-stop')
      )
    })
    stopButton.simulate('click')
    expect(props.onStop).toHaveBeenCalledTimes(1)

    
  })

  it('change time tracking text', () => {
    const newText = 'text1234'
    const props = {
      startTime,
      text,
      onChangeText: jest.fn()
    }


    setTimeout.mockReset()
    const wrapper = mount(<TimeEntryInput_withStoreAndTheme {...props} />)
    changeEntryTextValue(wrapper, newText)
    expect(setTimeout.mock.calls.length).toBeGreaterThan(0)
    //FIXME: runAllTimers frozen nodejs
    // jest.runAllTimers()
    // expect(props.onChangeText).toHaveBeenCalledTimes(1)
  })

  it('should be able to remove current tracking item', () => {
    const props = {
      startTime,
      text,
      onRemove: jest.fn()      
    }
    const wrapper = mount(<TimeEntryInput_withStoreAndTheme {...props} />)
    const btn = wrapper.findWhere(n => {
      return (
        (n.name() === 'EnhancedButton') 
        && 
        (n.prop('name') === 'btn-remove')
      )
    })
    btn.simulate('click')
    expect(props.onRemove).toHaveBeenCalledTimes(1)

  })

})
