import React, {Component, PropTypes} from 'react'
import {Doughnut} from 'react-chartjs-2'
import {durationInHourMinute} from './utils'

class DoughnutChart extends Component{
  static propTypes = {
    datasets: PropTypes.array,
    labels: PropTypes.array
  }

  static defaultProps = {
    datasets: [{
      data: [],
      backgroundColor: []
    }],
    labels: []
  }

  render() {
    let {datasets} = this.props
    datasets = datasets[0]
    let durationsInHourMinute = []
    if (datasets && datasets.data) {
      durationsInHourMinute = datasets.data.map((miliseconds) => {
        return durationInHourMinute(miliseconds)
      })
    }

    const options = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            if (data) {
              return ' ' + data.labels[tooltipItem.index] + ' ' + durationsInHourMinute[tooltipItem.index]  
            }
          },
          title: () => ('')
        }
      },
      legend: {
        display: false
      }
    }  
    return (
      <Doughnut 
        data={{labels: this.props.labels, datasets:this.props.datasets}}
        options={options}
      />
    );
  }
}

export default DoughnutChart