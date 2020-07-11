import React, { Component } from 'react';
import {connect} from 'react-redux'

import Header from '../components/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../App.css';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header userLoggedIn={this.props.auth.userLoggedIn} />
          <div className="content">
            <div className="row">
              <div className="col-xs-12
                col-sm-offset-2 col-sm-8
                col-md-offset-2 col-md-8
                col-lg-offset-2 col-lg-8
                ">
                {this.props.children}
              </div>
            </div>
          </div>          
        </div>
      </MuiThemeProvider>  
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
