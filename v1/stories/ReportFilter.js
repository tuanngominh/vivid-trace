import React from 'react';

import {Provider} from 'react-redux'
import configureStore from '../src/store/configureStore'

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ReportFilter from '../src/components/Report/Filter';

storiesOf('Report', module)
  .add('<ReportFilter />', () => {
    const store = configureStore()
    let startDate = (new Date(Date.UTC(2017, 1, 12, 20, 20, 0))).getTime()
    let endDate = (new Date(Date.UTC(2017, 1, 19, 20, 20, 0))).getTime()
    const props = {startDate, endDate}
    return (
      <Provider store={store}>
        <ReportFilter {...props} />
      </Provider>
    )
  })
