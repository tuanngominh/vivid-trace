import React, {Component, PropTypes} from 'react'

import {Bar} from 'react-chartjs-2'
import {red400} from 'material-ui/styles/colors';
import {durationInHourMinute, durationInHour} from './utils'

class BarChart extends Component {
  static propTypes = {
    labels: PropTypes.array,
    data: PropTypes.array
  }

  static defaultProps = {
    labels: [],
    data: []
  }

  render() {
    const durationsInHour = this.props.data.map((miliseconds) => {
      return durationInHour(miliseconds)
    })    
    const durationsInHourMinute = this.props.data.map((miliseconds) => {
      return durationInHourMinute(miliseconds)
    })

    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: 'Effort per day',
          backgroundColor: red400,
          data: durationsInHour
        }
      ]
    }
    const options = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            return durationsInHourMinute[tooltipItem.index]
          },
          title: () => ('')
        }
      },
      legend: {
        display: false
      }
    } 
    return <Bar 
      data={data} 
      height={100}
      options={options}
    />
  }
}

export default BarChart