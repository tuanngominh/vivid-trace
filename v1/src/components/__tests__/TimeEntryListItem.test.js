import React from 'react'
import {shallow, mount} from 'enzyme'

import withStoreAndTheme from '../../__mocks__/withStoreAndTheme'
import withTheme from '../../__mocks__/withTheme'
import TimeEntryListItem from '../TimeEntryListItem'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const TimeEntryListItem_withStoreAndTheme = withStoreAndTheme(TimeEntryListItem)

const props = {
  uid : "123",
  text : "entry description sample",
  id : "1",
  startTime : new Date("2017-02-06T03:18:05.672Z"),
  endTime : new Date("2017-02-06T04:18:05.672Z")
}


describe('<TimeEntryListItem />', () => {
  const setupComponent = () => {
    const actions = {
      onRemove: jest.fn(),
      onCreateTag: jest.fn(),
      onSelectTag: jest.fn()
    }
    const wrapper = shallow(<TimeEntryListItem {...actions} {...props} />)
    return {wrapper, actions, props}
  }
  it ('shoulde handle remove tracked item', () => {
    const {wrapper, actions, props} = setupComponent()
    wrapper.instance().handleRemove()
    expect(actions.onRemove).toHaveBeenCalledTimes(1)
    expect(actions.onRemove).toHaveBeenCalledWith(props.uid, props.id)
  })

  it ('should render correctly and without error', () => {
    const wrapper = mount(<TimeEntryListItem_withStoreAndTheme {...props} />)
    
    expect(wrapper.find('TextField').length).toBeGreaterThan(0)
    expect(wrapper.find('FlatButton').length).toBeGreaterThan(0)
  })

  it('can change text', () => {
    const {wrapper, actions, props} = setupComponent()
    const newEntryName = 'new entry name'
    wrapper.instance().handleChangeText({target: {value: newEntryName}})
    expect(wrapper.state().text).toBe(newEntryName)
  })

  it('can create tag and assign', () => {
    const {wrapper, actions, props} = setupComponent()
    const tagName = 'new tag name', tagColor = 'black'
    wrapper.instance().handleCreateTag(tagName, tagColor)
    expect(actions.onCreateTag).toHaveBeenCalledWith(props.uid, props.id, tagName, tagColor)
  })

  it('can select tag and assign', () => {
    const {wrapper, actions, props} = setupComponent()
    const tagId = 'tag1'
    wrapper.instance().handleSelectTag(tagId)
    expect(actions.onSelectTag).toHaveBeenCalledWith(props.uid, props.id, tagId)
  })  
})
