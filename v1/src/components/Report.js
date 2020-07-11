import React, {Component} from 'react'
import {get} from 'lodash'
import {connect} from 'react-redux'
import {getSummaryReport, getEffortByTagForDoughnutChart} from './Report/selectors.js'
import ReportFilter from './Report/Filter'
import ReportEntryList from './Report/EntryList'
import BarChart from './Report/BarChart'
import DoughnutChart from './Report/DoughnutChart'
import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = {
  padding: 10,
  margin: 10,
  marginBottom: 30
}

export class Report extends Component {
  render() {    
    const hasData = this.props.entries && (Object.keys(this.props.entries).length > 0)
    return (
      <div className="report">
        <Paper style={style} zDepth={1} >
          <ReportFilter />
        </Paper>
        {
          this.props.isFetching
          ?
            <div style={{textAlign: 'center', position: 'relative'}}>
              <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status="loading"
                style={{display: 'inline-block', position: 'relative'}}
              />
            </div>
          :
            hasData
            ?
              <div>
                <p>
                  Total{' '}
                  <span className='total-effort'>{this.props.report.totalEffort}</span>
                </p>
                <BarChart labels={this.props.report.effortByDayForBarChart.labels} data={this.props.report.effortByDayForBarChart.data} />
                <div className="row row2">
                  <div className="col-xs-12 col-sm-6">
                    <ReportEntryList entries={this.props.entries} />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <DoughnutChart labels={this.props.doughnutChart.labels} datasets={this.props.doughnutChart.datasets} />
                  </div>
                </div>                
              </div>
            :
              <p style={{textAlign: 'center'}}>No time entry found</p>
        }
      </div>
    )    
  }
}

const mapStateToProps = (state) => {
  return {
    report: getSummaryReport(state),
    doughnutChart: getEffortByTagForDoughnutChart(state),
    entries: get(state,"report.entries", {}),    
    isFetching: get(state, "report.isFetching", null)
  }
}

export default connect(
  mapStateToProps,
  null
)(Report)