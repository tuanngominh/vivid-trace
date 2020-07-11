import {withRouter} from 'react-router'
import React, {Component, PropTypes} from 'react'

import {confirmPasswordReset} from '../../actions/resetPassword'
import {connect} from 'react-redux'

import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import history from '../../history'

export class ConfirmPasswordReset extends Component {
  static propTypes = {
    state: PropTypes.object,
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
      openNotification: false
    }
  }

  componentWillReceiveProps(nextProps){
    const {status, errorMessage} = nextProps.state
    if (status === 'success') {
      this.setState({
        openNotification: true
      })
    } else {
      this.form.updateInputsWithError({newpassword: errorMessage})
    }
  }

  handleSubmit = (data, reset, invalidate) => {
    const {dispatch} = this.props
    const resetPasswordCode = this.props.location.query.oobCode
    dispatch(confirmPasswordReset(resetPasswordCode, data.newpassword))
  }

  render() {
    return (
      <div>
        <Formsy.Form
          ref={(node) => this.form = node}
          onValidSubmit={this.handleSubmit}
        >     
          <h3>Reset password</h3>     
          <FormsyText
            id="newpassword"
            name="newpassword"
            hintText="enter new password"
            floatingLabelText="New password"
            floatingLabelFixed={true} 
            type="password"
            validationError="Password is not empty"
            required
          /><br />
          <RaisedButton 
            label="Save" 
            primary={true} 
            type="submit"
          ></RaisedButton>  
          { this.props.state.isFetching ? <RefreshIndicator
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
            :
            ''
          }
          <FlatButton 
            label="Back to login" 
            onClick={() => {
              history.push('/login')
            }}
          />
        </Formsy.Form>
        <Snackbar
          open={this.state.openNotification}
          message="Password has been reset successfully. Please login with new password."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.resetPassword.confirmPasswordReset
  }
}

export default connect(mapStateToProps)(withRouter(ConfirmPasswordReset))