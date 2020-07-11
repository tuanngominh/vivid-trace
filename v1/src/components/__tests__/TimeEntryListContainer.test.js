import React from 'react'
import {shallow, mount} from 'enzyme'

import withStoreAndTheme from '../../__mocks__/withStoreAndTheme'
import {TimeEntryListContainer, TimeEntryListItemsByDay} from '../TimeEntryListContainer'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const uid = '123'
const TimeEntryListContainer_withStoreAndTheme = withStoreAndTheme(TimeEntryListContainer, {
  auth: {
    user: {
      uid
    }
  }
})

describe('TimeEntryListContainer', () => {
  it ('render', () => {
    const props = {
      onFetchList: jest.fn(),
      entries: {}
    }
    const wrapper = mount(<TimeEntryListContainer_withStoreAndTheme {...props} />)
    expect(props.onFetchList).toHaveBeenCalledTimes(1)
  })

})

const props = {
  day: 'Mon, 6 Feb',
  entries: [
    {
      "key": "KbxshEl9QNUZP15DU0h",
      startTime: "2017-02-02T08:13:37.638Z",
      endTime: "2017-02-02T08:13:01.618Z",
      text: "track log 1 track log 1 track log 1 track log 1"
    },
    {
      "key": "KbxxMXkuLAQcwpM5AD3",
      startTime: "2017-01-02T08:33:59.439Z",
      endTime: "2017-01-02T08:13:47.202Z",
      text: "track log 2 track log 2 track log 2 track log 2 "
    }
  ]
}

describe('<TimeEntryListItemsByDay />', () => {
  it ('render shallow with props', () => {
    const wrapper = shallow(<TimeEntryListItemsByDay 
      {...props}
    />)
    expect(wrapper.children().length).toBeGreaterThan(0)    
  })

})
