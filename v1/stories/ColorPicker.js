import React from 'react';

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ColorPicker from '../src/components/ColorPicker'
import FontIcon from 'material-ui/FontIcon'

storiesOf('ColorPicker', module)
  .add('default option', () => {
    return (
      <div style={{margin: 40}}>
        <ColorPicker />
      </div>
    )
  })
  .add('custom color and item per row', () => {
    const props = {
      availableColors: ['black', 'blue', 'green', 'red'],
      itemPerRow: 3
    }
    return (
      <div style={{margin: 40}}>
        <ColorPicker {...props} />
      </div>
    )
  })
  .add('custom font icon', () => {
    const props = {
      iconComponent: <FontIcon className="material-icons">stop</FontIcon>,
      selectedIconComponent: <FontIcon className="material-icons">check_box</FontIcon>
    }
    return (
      <div style={{margin: 40}}>
        <ColorPicker {...props} />
      </div>
    )
  })