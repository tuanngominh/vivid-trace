import React from 'react';

import {Provider} from 'react-redux'
import configureStore from '../src/store/configureStore'

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Table, TableBody} from 'material-ui/Table'
import TimeEntryListItem from '../src/components/TimeEntryListItem';

storiesOf('Time Entry Input', module)
  .add('Time entry list item - single item without tag', () => {
    const store = configureStore()
    return (
      <Provider store={store}>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TimeEntryListItem text="entry description sample" 
              id="1" 
              startTime={new Date("2017-02-06T03:18:05.672Z")} 
              endTime={new Date("2017-02-06T04:18:05.672Z")}
            />
          </TableBody>
        </Table>
      </Provider>
    )
  })
  .add('Time entry list item - single item with tag', () => {
    const store = configureStore()
    return (
      <Provider store={store}>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TimeEntryListItem text="entry description sample" 
              id="1" 
              tagName='tag1'
              tagColor='blue'
              startTime={new Date("2017-02-06T03:18:05.672Z")} 
              endTime={new Date("2017-02-06T04:18:05.672Z")}
            />
          </TableBody>
        </Table>
      </Provider>
    )
  })  

