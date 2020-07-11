import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router'

import {signout} from '../../actions/signout'

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import muiThemeable from 'material-ui/styles/muiThemeable'

class LoggedInMenu extends Component {
  render() {
    const appBar = this.props.muiTheme.appBar
    return (
      <IconMenu
        iconStyle={{color: appBar.textColor}}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
        <MenuItem primaryText="Sign out" onClick={this.props.onSignout} />
      </IconMenu>
    )    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignout: () => {
      dispatch(signout())
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(muiThemeable()(LoggedInMenu))