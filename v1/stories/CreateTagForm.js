import React from 'react';

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CreateTagForm from '../src/components/CreateTagForm'

storiesOf('Tag', module)
  .add('<CreateTagForm />', () => {
    return (
      <div style={{width:360, marginLeft:'auto', marginRight:'auto'}}>
        <CreateTagForm onSave={action('on-save')}/>
      </div>
    )
  })
