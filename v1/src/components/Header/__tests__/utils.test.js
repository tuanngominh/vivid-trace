import React from 'react'
import {mount} from 'enzyme'

import {getMenuStyle} from '../utils'

describe('Header.utils', () => {
  const appBarStyle = {color: '#000', textColor: '#111'}
  const pathname = '/reports'

  it ('getMenuStyle - none selected style', () => {
    expect(getMenuStyle(appBarStyle, pathname, '/')).toEqual({
      color: appBarStyle.textColor
    })
  })

  it ('getMenuStyle - selected style', () => {
    expect(getMenuStyle(appBarStyle, pathname, '/reports')).toEqual({
      color: appBarStyle.color,
      backgroundColor: appBarStyle.textColor
    })
  })

})
