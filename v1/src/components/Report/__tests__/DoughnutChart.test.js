import React from 'react'
import {shallow} from 'enzyme'
import DoughnutChart from '../DoughnutChart'

describe('DoughnutChart', () => {
  it ('should render without error', () => {
    const props = {
      labels: ['Tag 1', 'Tag 2'],
      datasets: [{
        data: [1000, 2000],
        backgroundColor: ['black', 'blue']
      }],
    }
    const wrapper = shallow(<DoughnutChart {...props} />)
  })

})
