import React, {PropTypes} from 'react'

import FlatButton from 'material-ui/FlatButton'
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import muiThemeable from 'material-ui/styles/muiThemeable'

import {Link} from 'react-router'
import { withRouter } from 'react-router'

import LoggedInMenu from '../../containers/Header/LoggedInMenu'
import {getMenuStyle} from './utils'

const DesktopNav = (props) => {
  const appBar = props.muiTheme.appBar
  const pathname = (props.location && props.location.pathname) ? props.location.pathname : '';
  const {userLoggedIn = false} = props

  return (
      userLoggedIn
      ?    
      <ToolbarGroup>
        <ToolbarSeparator />
        <FlatButton 
          label="Tracker" 
          containerElement={<Link to="/tracker"/>}  
          style={getMenuStyle(appBar, pathname, '/tracker')} />
        <FlatButton 
          label="Reports" 
          containerElement={<Link to="/report"/>}  
          style={getMenuStyle(appBar, pathname, '/report')} />
        <ToolbarSeparator/>
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
)}

DesktopNav.propTypes = {
  userLoggedIn: PropTypes.bool
}

export default muiThemeable()(withRouter(DesktopNav))