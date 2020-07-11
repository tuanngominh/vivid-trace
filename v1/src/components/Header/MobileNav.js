import React, {PropTypes} from 'react'

import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import muiThemeable from 'material-ui/styles/muiThemeable'

import {Link} from 'react-router'
import { withRouter } from 'react-router'

import LoggedInMenu from '../../containers/Header/LoggedInMenu'
import {getMenuStyle} from './utils'

const MobileNav = (props) => {
  const appBar = props.muiTheme.appBar
  const pathname = (props.location && props.location.pathname) ? props.location.pathname : '';
  const {userLoggedIn = false} = props

  return (
    userLoggedIn
    ?
    <ToolbarGroup>
      <ToolbarSeparator />
      <IconButton 
        containerElement={<Link to="/tracker"/>} 
        iconStyle={getMenuStyle(appBar, pathname, '/tracker')} 
        tooltipPosition='bottom-center'
        >
        <FontIcon className="material-icons">play_arrow</FontIcon>
      </IconButton>
      <IconButton 
        containerElement={<Link to="/report"/>} 
        iconStyle={getMenuStyle(appBar, pathname, '/report')} 
        tooltipPosition='bottom-center'
        >
        <FontIcon className="material-icons">show_chart</FontIcon>
      </IconButton>
      <ToolbarSeparator />
      <LoggedInMenu iconStyle={{
        color: appBar.textColor
      }}/>
    </ToolbarGroup>
    :
    <ToolbarGroup>
        <FlatButton 
          label="Login" 
          style={getMenuStyle(appBar, pathname, '/login')} 
          containerElement={<Link to="/login"/>} 
        />
        <FlatButton 
          label="Register" 
          style={getMenuStyle(appBar, pathname, '/register')} 
          containerElement={<Link to="/register"/>} 
        />
    </ToolbarGroup>
  )
}

MobileNav.propTypes = {
  userLoggedIn: PropTypes.bool
}

export default muiThemeable()(withRouter(MobileNav))