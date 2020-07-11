import React from 'react';

import {Provider} from 'react-redux'
import configureStore from '../src/store/configureStore'

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {TimeEntryInputContainer} from '../src/components/TimeEntryInputContainer';

const store = configureStore()

const commonProps = {
  uid: 'user-id-123',
  onChangeText: action('onChangeText'),
  onChangeStartTime: action('onChangeStartTime'),
  onStop: action('onStop'),
  onStart: action('onStart'),
  onPull: action('onPull'),
  onRemove: action('onRemove'),
  onCreateTag: action('onCreateTag')  
}

storiesOf('Time Entry Input', module)
  .add('<TimeEntryInput /> - Not tracking', () => {
    return (
      <Provider store={store}>
        <TimeEntryInputContainer 
          {...commonProps}
        />
      </Provider>
    )
  })
  .add('<TimeEntryInput /> - With loading indicator', () => {
    //marterial-ui's LinearProgress raise error with 'mode=indeterminate' in Jest env
    //so exclude this test
    if (process.env.NODE_ENV === 'test') {
      return (<div />)
    }
    return (
      <Provider store={store}>
        <TimeEntryInputContainer 
          {...commonProps}
          isFetching={true}
        />
      </Provider>
    )
  })
  .add('<TimeEntryInput /> - Tracking', () => {
    let startTime = new Date()
    startTime.setSeconds(startTime.getSeconds() - 10)
    startTime = startTime.getTime()
    return (
      <Provider store={store}>
        <TimeEntryInputContainer 
          {...commonProps}
          text="time entry description" 
          startTime={startTime}
        />
      </Provider>
    )
  })

