import React from 'react'
import {shallow, mount} from 'enzyme'

import {toAmPm} from '../../utils/time'

import withStoreAndTheme from '../../__mocks__/withStoreAndTheme'
import {TimeEntryInputContainer} from '../TimeEntryInputContainer'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const uid = '123'
const TimeEntryInputContainer_withStoreAndTheme = withStoreAndTheme(TimeEntryInputContainer, {
  auth: {
    user: {
      uid
    }
  }
})

const setupActionProps = () => ({
  onPull: jest.fn(),
  onChangeText: jest.fn(),
  onChangeStartTime: jest.fn(),
  onStop: jest.fn(),
  onStart: jest.fn(),
  onPull: jest.fn(),
  onRemove: jest.fn(),
  onCreateTag: jest.fn(),
  onSelectTag: jest.fn()
})

const getTimeInThePast = () => {
  const now = new Date()
  //try a specific time in the past so snapshot test doesn't failed
  const startTime = new Date(Date.UTC(2015, 1, 12, 20, 20, 0))
  return startTime.getTime()
}

describe('<TimeEntryInputContainer />', () => {

  it ('render', () => {
    const props = setupActionProps()
    const wrapper = mount(<TimeEntryInputContainer_withStoreAndTheme {...props} />)
    expect(wrapper.children().length).toBeGreaterThan(0)
    expect(props.onPull).toHaveBeenCalledTimes(1)
  })

  it ('can pull current tracking entry from server during first render', () => {
    const props = setupActionProps()
    const wrapper = mount(<TimeEntryInputContainer_withStoreAndTheme {...props} />)
    expect(props.onPull).toHaveBeenCalledTimes(1)
  })

  it ('can change start time', () => {
    //20:20 PM UTC
    const now =               new Date(Date.UTC(2017, 1, 12, 20, 20, 0))
    //earlier than now 20 minutes
    //20:00 PM UTC
    const originalStartTime = new Date(Date.UTC(2017, 1, 12, 20, 0, 0))
    //earlier than now 10 minutes
    //20:10 PM UTC
    const newStartTime =      new Date(Date.UTC(2017, 1, 12, 20, 10, 0))
    const props = Object.assign({
      now: now.getTime(),
      startTime: originalStartTime.getTime(),
      uid
    }, setupActionProps())
    const wrapper = shallow(<TimeEntryInputContainer {...props} />)

    wrapper.instance().handleUpdateStartTimeAmPm({
      target: {
        value: toAmPm(newStartTime)
      }
    })
    expect(props.onChangeStartTime).toHaveBeenCalledTimes(1)
    expect(props.onChangeStartTime.mock.calls[0][0]).toBe(uid)
    //remove milisecond during compare
    expect(props.onChangeStartTime.mock.calls[0][1].toJSON().slice(0, -5)).toBe(newStartTime.toJSON().slice(0, -5))
  
  })

  it ('can only change time to valid format data', () => {
    
    const originalStartTime = getTimeInThePast()
    const originalStartTimeAmPm = toAmPm(new Date(originalStartTime))
    const props = Object.assign({
      startTime: originalStartTime
    }, setupActionProps())
    const wrapper = shallow(<TimeEntryInputContainer {...props} />)

    wrapper.instance().handleUpdateStartTimeAmPm({
      target: {
        value: 'invalid time'
      }
    })
    
    expect(props.onChangeStartTime).toHaveBeenCalledTimes(0)
    expect(wrapper.state().startTimeAmPm).toBe(originalStartTimeAmPm)
  })

  it ('should be able to handle delete current tracking item', () => {
    const props = Object.assign({
      startTime: getTimeInThePast()
    }, setupActionProps())
    const wrapper = shallow(<TimeEntryInputContainer {...props} />)

    wrapper.instance().handleRemove()
    
    expect(props.onRemove).toHaveBeenCalledTimes(1)
  })

  it ('can stop and save current tracking data', () => {
    const props = Object.assign({
      startTime: getTimeInThePast()
    }, setupActionProps())
    const wrapper = shallow(<TimeEntryInputContainer {...props} />)

    wrapper.instance().handleStop()
    
    expect(props.onStop).toHaveBeenCalledTimes(1)    
  })

  it('can change tag', () => {
    const props = Object.assign({
      startTime: getTimeInThePast()
    }, setupActionProps())
    const wrapper = shallow(<TimeEntryInputContainer {...props} uid={uid} />)

    const tagId = 'tag1'
    wrapper.instance().handleSelectTag(tagId)
    
    expect(props.onSelectTag).toHaveBeenCalledWith(uid, tagId)       
  })
})
