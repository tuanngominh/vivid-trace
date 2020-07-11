import {withRouter} from 'react-router'
import React, {Component} from 'react'

import {login} from '../../actions/login'
import {connect} from 'react-redux'

import Paper from 'material-ui/Paper'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton'

import history from '../../history'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      validationErrors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    const {status, errorMessage} = nextProps.auth
    if (status === 'success') {
      const { location } = this.props
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/tracker')
      }
    } else {
      this.form.updateInputsWithError({password: errorMessage})
    }
  }

  handleInvalidSubmit = (data) => {
    console.error('Form error:', data)
  }

  handleSubmit = (data, reset, invalidate) => {
    const {dispatch} = this.props
    dispatch(login(data.email, data.password))
  }

  render() {
    return (
      <Paper style={{padding: 50, marginTop: 30}}>
        <Formsy.Form
          ref={(node) => this.form = node}
          onValidSubmit={this.handleSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
        >          
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
          <FormsyText
            id="password"
            name="password"
            hintText="your password"
            floatingLabelText="Password"
            floatingLabelFixed={true}
            type="password"
            required
            validationError="Password is required"
          /><br />
          <RaisedButton 
            label="Login" 
            primary={true} 
            type="submit"
          ></RaisedButton>  
          { this.props.auth.isFetching ? <RefreshIndicator
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
            label="Reset password" 
            style={{marginLeft: 10}} 
            onClick={() => {
              history.push('/request-reset-password')
            }}
          />
        </Formsy.Form>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withRouter(Login))