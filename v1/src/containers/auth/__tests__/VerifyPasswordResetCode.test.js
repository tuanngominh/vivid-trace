import React from 'react'
import {shallow} from 'enzyme'

import {VerifyPasswordResetCode} from '../VerifyPasswordResetCode'
import {ConfirmPasswordReset} from '../ConfirmPasswordReset'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<VerifyPasswordResetCode />', () => {

  it ('empty code', () => {
    const props = {
      location: {
        query: {
          oobCode: ''
        }
      }
    }
    
    const wrapper = shallow(<VerifyPasswordResetCode {...props} />)
    expect(wrapper.find('InvalidResetPasswordCode').length).toBe(1)
  })

  it ('checking code', () => {
    const props = {
      location: {
        query: {
          oobCode: 'somecode'
        },  
      },
      state: {
        isFetching: true
      },
      onVerifyPasswordResetCode: jest.fn()
    }
    const wrapper = shallow(<VerifyPasswordResetCode {...props} />)
    expect(wrapper.find('RefreshIndicator').length).toBe(1)
  })

  it ('invalid code', () => {
    const props = {
      location: {
        query: {
          oobCode: 'somecode'
        },  
      },
      state: {
        isFetching: false
      },
      onVerifyPasswordResetCode: jest.fn()
    }
    const wrapper = shallow(<VerifyPasswordResetCode {...props} />)
    wrapper.setState({
      validCode: false
    })
    expect(wrapper.find('InvalidResetPasswordCode').length).toBe(1)
  })

  it ('valid code', () => {
    const props = {
      location: {
        query: {
          oobCode: 'somecode'
        },  
      },
      state: {
        isFetching: false
      },
      onVerifyPasswordResetCode: jest.fn()
    }
    const wrapper = shallow(<VerifyPasswordResetCode {...props} />)
    wrapper.setState({
      validCode: true
    }) 
    //ConfirmPasswordReset is wrapp with router and redux
    expect(wrapper.find('Connect(withRouter(ConfirmPasswordReset))').length).toBe(1)
  })  

})
