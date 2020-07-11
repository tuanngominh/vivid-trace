import React from 'react'
import { configure, addDecorator } from '@kadira/storybook'

// custom style for components
import '../src/App.css'
import '../node_modules/flexboxgrid/dist/flexboxgrid.min.css'

// Needed for onTouchTap of material-ui.com components
import injectTapEventPlugin from 'react-tap-event-plugin'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//Add decorator to init Material UI theme
const WrapMuiThemeProvider = (story) => {
  //hack so hot reload still working
  try {
    injectTapEventPlugin()
  } catch (e) {

  }
    
  return (
    <MuiThemeProvider>
      {story()}
    </MuiThemeProvider>
  )
}

addDecorator(WrapMuiThemeProvider)

function loadStories() {
  require('../stories/header.js')

  require('../stories/auth.js')

  require('../stories/TimeEntryInput.js')
  require('../stories/TimeEntryListItem.js')
  require('../stories/TimeEntryListItemsByDay.js')

  require('../stories/ReportFilter.js')

  require('../stories/ColorPicker.js')
  require('../stories/CreateTagForm.js')
  require('../stories/AddTagButton.js')
  
}

configure(loadStories, module);


