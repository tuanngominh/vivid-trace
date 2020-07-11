import React from 'react';

import {Provider} from 'react-redux'
import configureStore from '../src/store/configureStore'

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Table, TableBody} from 'material-ui/Table'
import {TimeEntryListItemsByDay} from '../src/components/TimeEntryListContainer';

const props = {
  date: 'Mon, 6 Feb',
  entries: [
    {
      "key": "KbxshEl9QNUZP15DU0h",
      startTime: new Date("2017-02-02T08:13:37.638Z"),
      endTime: new Date("2017-02-02T08:13:01.618Z"),
      text: "track log 1 track log 1 track log 1 track log 1",
      tagName: 'tag1',
      tagColor: 'blue'
    },
    {
      "key": "KbxxMXkuLAQcwpM5AD3",
      startTime: new Date("2017-01-02T08:33:59.439Z"),
      endTime: new Date("2017-01-02T08:13:47.202Z"),
      text: "track log 2 track log 2 track log 2 track log 2 "
    }
  ]
}

storiesOf('Time Entry Input', module)
  .add('TimeEntryListItemsByDay - single day', () => {
    const store = configureStore()
    return (
      <Provider store={store}>
        <TimeEntryListItemsByDay {...props} />
      </Provider>
    )
  })
  .add('TimeEntryListItemsByDay - multiple days', () => {
    const store = configureStore()
    return (
      <Provider store={store}>
        <div>
          <TimeEntryListItemsByDay {...props} />
          <TimeEntryListItemsByDay {...props} />
        </div>
      </Provider>
    )
  })
