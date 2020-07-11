// Display waiting screen during checking user's logged in  status with server

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {get} from 'lodash'
import {isUserLoggedIn} from '../actions/isUserLoggedIn'

import LinearProgress from 'material-ui/LinearProgress'

export class CheckAuth extends Component {
  static propTypes = {
    onCheckIsUserLoggedIn: PropTypes.func
  }

  componentWillMount() {
    this.props.onCheckIsUserLoggedIn()
  }

  componentWillReceiveProps = (nextProps) => {
    const {userLoggedIn, location, router, isFetching} = nextProps
    if (isFetching) {
      return
    }
    if (userLoggedIn) {
      if (location.state && location.state.nextPathname) {
        router.replace(location.state.nextPathname)
      } else {
        router.replace('/tracker')
      }
    } else {
      history.push('/login')
    }
  }

  render() {
    return (
      <div style={{
        marginTop: '30vh',
        textAlign: 'center'
      }}>
        Check authentication status <br/><br/>
        <LinearProgress mode="indeterminate" />
      </div> 
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckIsUserLoggedIn: (uid, text) => {
      dispatch(isUserLoggedIn())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: get(state,"auth.userLoggedIn", null),
    isFetching: get(state,"auth.isFetching", null)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckAuth)