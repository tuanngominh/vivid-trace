import React, {PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable'

import DesktopNav from './Header/DesktopNav'
import MobileNav from './Header/MobileNav'

class Header extends React.Component {
  static propTypes = {
    userLoggedIn: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {type:'desktop'};
  }

  componentDidMount() {
    const checkMediaQuery = () => {
      const type = window.matchMedia("(max-width: 550px)").matches ? 'mobile': 'desktop';
      if (type !== this.state.type) {
        this.setState({type});
      }
    };

    window.addEventListener('resize', checkMediaQuery);
    checkMediaQuery();
  }

  render() {
    const appBar = this.props.muiTheme.appBar
    const {userLoggedIn = false} = this.props

    return (
      <Toolbar style={{
        backgroundColor: appBar.color   
      }}>
        <ToolbarGroup firstChild={true}> 
          <FontIcon className="material-icons" style={{
            color: appBar.textColor
          }}>alarm_on</FontIcon>
          <ToolbarTitle text="Vivid Trace" style={{
            color: appBar.textColor
          }}/>
        </ToolbarGroup>
        { 
          (this.state.type === 'desktop') 
          ? 
          <DesktopNav userLoggedIn={userLoggedIn} /> 
          : 
          <MobileNav userLoggedIn={userLoggedIn} /> 
        }
      </Toolbar>
    );
  }
}

export default muiThemeable()(Header)