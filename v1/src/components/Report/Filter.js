import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {fetch} from '../../actions/report'
import moment from 'moment'

import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'

export class ReportFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    startDate: PropTypes.number,
    endDate: PropTypes.number
  }

  static defaultProps = {
    text: ''
  }

  constructor(props) {
    super(props)

    const getStartDate = () => {
      let startDate = new Date()
      startDate.setDate(startDate.getDate() - 7)
      startDate.setHours(0, 0, 0)
      return startDate
    }

    const endDate = new Date()
    this.state = {
      text: '',      
      startDate: props.startDate ? new Date(props.startDate) : getStartDate(),
      endDate: props.endDate ? new Date(props.endDate) : endDate,
      changeTextSubmitTimeoutId: null,
      dialogOpen: false
    }
  }

  componentWillMount() {
    const {text, startDate, endDate} = this.state
    this.props.onChange(this.props.uid, text, startDate, endDate)    
  }

  handleOpenDialog = () => {
    this.setState({dialogOpen:true})
  }

  handleCloseDialog = () => {
    this.setState({dialogOpen:false})

    const {text, startDate, endDate} = this.state
    this.props.onChange(this.props.uid, text, startDate, endDate)
  }

  handleStartDateChange = (e, date) => {
    this.setState({
      startDate: date
    })
  }

  handleEndDateChange = (e, date) => {
    if (date > this.state.startDate) {
      this.setState({
        endDate: date
      })      
    }
  }

  handleChangeText = (e) => {    
    const text = e.target.value
    this.setState({
      text: text
    })

    if (this.state.startDate) {
      if (this.state.changeTextSubmitTimeoutId) {
        clearTimeout(this.state.changeTextSubmitTimeoutId)
      }

      const timeout = setTimeout(() => {
        this.props.onChange(this.props.uid, this.state.text, this.state.startDate, this.state.endDate)
      }, 1000)
      this.setState({
        changeTextSubmitTimeoutId: timeout
      })
      
    }    
  }

  getDurationSummary = (startDate, endDate) => {
    if (startDate.getYear() !== endDate.getYear()) {
      return moment(startDate).format('D MMM, YYYY') + ' - ' + moment(endDate).format('D MMM, YYYY')
    } else {
      return moment(startDate).format('D MMM') + ' - ' + moment(endDate).format('D MMM')
    }
  }

  render() {
    return (
      <div className="report-filter">
        <div className="filter-criteria first">
          <TextField
            value={this.state.text}
            onChange={this.handleChangeText}
            id="keyword"
            name="keyword"
            placeholder="Search keyword"
          />
        </div>        
        <div className="filter-criteria filter-duration" onClick={this.handleOpenDialog}>
          {this.getDurationSummary(this.state.startDate, this.state.endDate)} <i className="fa fa-angle-down" aria-hidden="true"></i>
        </div>
        <Dialog
          open={this.state.dialogOpen}
          onRequestClose={this.handleCloseDialog}
        >
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <DatePicker 
                autoOk={true}
                hintText="Start date" 
                value={this.state.startDate} 
                onChange={this.handleStartDateChange}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <DatePicker 
                autoOk={true}
                hintText="End date" 
                value={this.state.endDate} 
                onChange={this.handleEndDateChange}
              />
            </div>            
          </div>
        </Dialog>        
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uid: get(state,"auth.user.uid", null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (uid, text, startDate, endDate) => {
      dispatch(fetch(uid, text, startDate.getTime(), endDate.getTime()))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFilter)