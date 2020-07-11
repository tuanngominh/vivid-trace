import React, {Component, PropTypes} from 'react'

import {sendPasswordResetEmail} from '../../actions/resetPassword'
import {connect} from 'react-redux'

import Paper from 'material-ui/Paper'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import history from '../../history'

export class SendPasswordResetEmail extends Component {
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
      this.form.updateInputsWithError({email: errorMessage})
    }
  }

  handleSubmit = (data, reset, invalidate) => {
    const {dispatch} = this.props
    dispatch(sendPasswordResetEmail(data.email))
  }

  render() {
    return (
      <Paper style={{padding: 50, marginTop: 30}}>
        <Formsy.Form
          ref={(node) => this.form = node}
          onValidSubmit={this.handleSubmit}
        >     
          <h3>Reset password</h3>     
          <FormsyText
            id="email"
            name="email"
            hintText="email@address.com"
            floatingLabelText="Email address"
            floatingLabelFixed={true} 
            type="email"
            validations="isEmail"
            validationError="This is not an email"
            required
          /><br />
          <RaisedButton 
            label="Send recover code" 
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
            style={{marginLeft: 10}} 
            onClick={() => {
              history.push('/login')
            }}
          />
        </Formsy.Form>
        <Snackbar
          open={this.state.openNotification}
          message="Reset password instruction has sent to your email"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />        
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.resetPassword.sendPasswordResetEmail
  }
}

export default connect(mapStateToProps)(SendPasswordResetEmail)