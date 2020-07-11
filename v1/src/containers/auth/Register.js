import {withRouter} from 'react-router'
import React, {Component, PropTypes} from 'react'

import {connect} from 'react-redux'
import {register} from '../../actions/register'

import Paper from 'material-ui/Paper'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator';

export class Register extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    isFetching: false
  }

  handleInvalidSubmit = (data) => {
    console.error('Form error:', data)
  }

  componentWillReceiveProps(nextProps){
    const {status, errorMessage} = nextProps
    if (status === 'success') {
      const { location } = this.props
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }      
    } else {
      this.form.updateInputsWithError({password: errorMessage})
    }
  }

  handleSubmit = (data, reset, invalidate) => {
    this.props.onSubmit(data.email, data.password)    
  }

  render() {
    return (
      <Paper style={{padding: 50, marginTop: 30}}>
        <Formsy.Form
          onValidSubmit={this.handleSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
          ref={(node) => this.form = node}
        >
          <FormsyText
            id="email"
            name="email"
            hintText="youremail@address.com"
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
            hintText="enter your password"
            floatingLabelText="Password"
            floatingLabelFixed={true}
            type="password"
            required
            validationError="Password is required"
          /><br />
          <RaisedButton 
            label="Register" 
            primary={true} 
            type="submit"
          />
          { this.props.isFetching ? <RefreshIndicator
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
        </Formsy.Form>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (email, password) => {
      dispatch(register(email, password))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register))