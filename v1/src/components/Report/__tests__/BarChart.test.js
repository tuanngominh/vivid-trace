import React from 'react'
import {shallow, mount} from 'enzyme'
import BarChart from '../BarChart'
import withTheme from '../../../__mocks__/withTheme'

const BarChart_withTheme = withTheme(BarChart)


describe('<BarChart />', () => {
  it ('should render without error', () => {
    const props = {
      labels: ['Feb 2', 'Feb 3'],
      data: [1000, 2000]
    }
    const wrapper = shallow(<BarChart {...props} />)
  })

})
