import React from 'react'
import {shallow, mount} from 'enzyme'
import EntryList from '../EntryList'
import withTheme from '../../../__mocks__/withTheme'

const EntryList_withTheme = withTheme(EntryList)


describe('<EntryList />', () => {
  it ('should render without error', () => {
    const props = {
      entries: {
        '-KcmfMSMMEaPZvVb_ijs': {
          endTime: 1486736967968,
          startTime: 1486736353777,
          text: 'entry 1'
        },
        '-KcmfQxZsRi7gQit-xuN': {
          endTime: 1486823309771,
          startTime: 1486822659128,
          text: 'entry 2'
        }
      }
    }
    const wrapper = mount(<EntryList_withTheme {...props} />)
    expect(wrapper.find('TableHeader').length).toBe(1)
    expect(wrapper.find('TableHeaderColumn').length).toBe(2)
    expect(wrapper.find('TableRow').length).toBe(3)
  })

})
