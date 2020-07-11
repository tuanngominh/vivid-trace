jest.useFakeTimers()
import React from 'react'
import {shallow, mount} from 'enzyme'
import {ReportFilter} from '../Filter'
import withTheme from '../../../__mocks__/withTheme'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const ReportFilter_withTheme = withTheme(ReportFilter)

let startDate = new Date()
startDate.setDate(startDate.getDate() - 7)
const endDate = new Date()
const props = {
  startDate,
  endDate,
  onChange: jest.fn()
}

describe('<ReportFilter />', () => {
  describe('should fetch data', () => {
    it ('on render', () => {
      const wrapper = shallow(<ReportFilter {...props} />)
      expect(props.onChange).toHaveBeenCalled()
    })

    it ('when close time dialog', () => {

      const wrapper = shallow(<ReportFilter {...props} />)
      wrapper.instance().handleCloseDialog()
      expect(props.onChange).toHaveBeenCalled()
    })

    it ('when mount', () => {
      const wrapper = mount(<ReportFilter_withTheme {...props} />)
      expect(props.onChange).toHaveBeenCalled()
    })
  })

  it ('can render without passing start date, end date', () => {
    const props = {
      onChange: jest.fn()
    }
    const wrapper = shallow(<ReportFilter {...props} />)
  })
})
