import React, {Component} from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const withTheme = function(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <MuiThemeProvider>
          <WrappedComponent {...this.props}></WrappedComponent>
        </MuiThemeProvider>
      )
    }
  }
}
export default withTheme