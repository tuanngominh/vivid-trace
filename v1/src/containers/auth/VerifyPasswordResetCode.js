import {withRouter} from 'react-router'
import React, {Component, PropTypes} from 'react'
import history from '../../history'

import {verifyPasswordResetCode} from '../../actions/resetPassword'
import {connect} from 'react-redux'

import ConfirmPasswordReset from './ConfirmPasswordReset'

import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {red500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'

const InvalidResetPasswordCode = (props) => (
  <div>
    <span style={{color: red500}}>{props.errorMessage}</span><br/><br/>
    <RaisedButton
      primary={true}
      label='Request another change password reset'
      onClick={() => {history.push('/request-reset-password')}}
    />
  </div>
)

export class VerifyPasswordResetCode extends Component {
  static propTypes = {
    onVerifyPasswordResetCode: PropTypes.func,
    state: PropTypes.shape({
      isFetching: PropTypes.bool
    }),    
    dispatch: PropTypes.func
  }

  defaultProps = {
    state: {
      isFetching: false
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      code: props.location.query.oobCode,
      errorMessage: '',
      validCode: false
    }
  }

  componentWillMount() {
    if (this.state.code) {
      this.props.onVerifyPasswordResetCode(this.state.code)
    }    
  }

  componentWillReceiveProps(nextProps){
    const {status, errorMessage} = nextProps.state
    if (status === 'error') {
      this.setState({
        errorMessage: errorMessage ? errorMessage : 'Invalid password reset code',
        validCode: false
      })
    } else {
      this.setState({
        validCode: true
      })
    }
  }  

  render() {
    return (
      <Paper style={{padding: 50, marginTop: 30}}>
        { 
          !this.state.code 
          ?
            <InvalidResetPasswordCode errorMessage='Password reset code missing' />
          :
            this.props.state.isFetching 
            ? 
              <div>
                <span>Checking reset password code</span>
                <RefreshIndicator
                  loadingColor="#FF9800"
                  status="loading"
                  size={30}
                  left={10}
                  top={7}
                  style={{
                    display: 'inline-block',
                    position: 'relative'
                  }}
                />
              </div>
            :
              !this.state.validCode 
              ?
                <InvalidResetPasswordCode errorMessage={this.state.errorMessage} />
              :
                <ConfirmPasswordReset />   
        }
      </Paper>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVerifyPasswordResetCode: (code) => {
      dispatch(verifyPasswordResetCode(code))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.resetPassword.verifyPasswordResetCode
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerifyPasswordResetCode))