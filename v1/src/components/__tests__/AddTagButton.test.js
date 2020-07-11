import React, {Component, PropTypes} from 'react'
import {shallow, mount} from 'enzyme'
import withTheme from '../../__mocks__/withTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AddTagButton, {TagItem, TagItemList, TagButton} from '../AddTagButton'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('TagItem widget', () => {
  const actionProps = () => ({
    onSelectTag: jest.fn()
  })

  it('can render without error', () => {
    const wrapper = shallow(<TagItem />)
  })

  it('can select by click', () => {
    const props = Object.assign({
      name: 'tag 1',
      color: 'black',
      id: 'b12123'
    }, actionProps())
    const wrapper = shallow(<TagItem {...props}/>)
    wrapper.instance().handleSelectTag()
    expect(props.onSelectTag).toHaveBeenCalledWith(props.id, props.name, props.color)

  })
})

const tags = [
  {key: '1', id: '1', name: 'tag 1', color: '#ac725e'},
  {key: '2', id: '2', name: 'tag 2', color: '#8f8f8f'}
]
const TagItemList_withTheme = withTheme(TagItemList)
describe('TagItemList widget', () => {
  const actionProps = () => ({
    onSelectTag: jest.fn()
  })

  it('can render without error', () => {
    const wrapper = mount(<TagItemList_withTheme tags={tags} {...actionProps} />)
    expect(wrapper.find('List').length).toBe(2)
    expect(wrapper.find('TagItem').length).toBe(2)
  })

  it('can filter', () => {
    const wrapper = shallow(<TagItemList tags={tags} {...actionProps} />)
    //enter existing tag name
    wrapper.instance().handleFilterTagChange({target: {value: 'tag'}})
    expect(wrapper.find('TagItem').length).toBeGreaterThan(0)

    //enter none existing tag name
    wrapper.instance().handleFilterTagChange({target: {value: 'not existing tag name'}})
    expect(wrapper.find('TagItem').length).toBe(0)
  })  
})

describe('AddTag button', () => {
  const actionProps = () => ({
    onClick: jest.fn()
  })

  it('Can render without value', () => {
    const wrapper = shallow(<TagButton {...actionProps()}/>)
  })

  it('Can render with value', () => {
    const wrapper = shallow(<TagButton tagName='tag 1' tagColor='black' {...actionProps()}/>)
  })

  it('Can click to open tag form', () => {
    const actionsProp = actionProps()
    const wrapper = shallow(<TagButton tagName='tag 1' tagColor='black' {...actionsProp}/>)
    wrapper.find('FlatButton').simulate('click')
    expect(actionsProp.onClick).toHaveBeenCalledTimes(1)
  })  

})

const AddTagButton_withTheme = withTheme(AddTagButton)

describe('Add tag button widget', () => {
  const setupActionProps = () => ({
    onCreateTag: jest.fn(),
    onFetchList: jest.fn(),
    onSelectTag: jest.fn()    
  })
  const setupComponent = (props = {}) => {
    const actionProps = setupActionProps()
    const wrapper = shallow(<AddTagButton {...props} {...actionProps}/>)
    return {actionProps, wrapper}  
  }

  it('can fetch data when render', () => {
    const {actionProps, wrapper} = setupComponent()
    expect(actionProps.onFetchList).toHaveBeenCalled()
  })

  it('can create', () => {
    const {actionProps, wrapper} = setupComponent()
    wrapper.instance().handleCreateTag()
    expect(actionProps.onCreateTag).toHaveBeenCalled()
  })

  it('can select another tag', () => {
    const {actionProps, wrapper} = setupComponent()
    const tagId = 'tag1', tagName = 'tag name 1', tagColor = 'black'
    wrapper.instance().handleSelectTag(tagId, tagName, tagColor)
    expect(actionProps.onSelectTag).toHaveBeenCalledWith(tagId)
    expect(wrapper.state().tagName).toBe(tagName)
    expect(wrapper.state().tagColor).toBe(tagColor)
  })

  it('can open create tag dialog', () => {
    const {actionProps, wrapper} = setupComponent()
    wrapper.instance().handleOpenCreateTagDialog()
    expect(wrapper.state().createTagDialogOpen).toBe(true)
    expect(wrapper.state().openTagForm).toBe(false)
  })

  it('can close create tag dialog', () => {
    const {actionProps, wrapper} = setupComponent()
    wrapper.instance().handleCloseCreateTagDialog()
    expect(wrapper.state().createTagDialogOpen).toBe(false)
  })

  it('can open tag form dialog', () => {
    const {actionProps, wrapper} = setupComponent()
    wrapper.instance().handleOpenTagForm({preventDefault(){}})
    expect(wrapper.state().openTagForm).toBe(true)
  })

  it('can close tag form dialog', () => {
    const {actionProps, wrapper} = setupComponent()
    wrapper.instance().handleCloseTagForm()
    expect(wrapper.state().openTagForm).toBe(false)
  })

  it('can change to new tag', () => {
    let tags = []
    for (let i = 0; i < 30; i++) {
      tags.push({
        key: 'key' + i,
        id: 'key' + i,
        name: 'name' + i,
        color: 'color' + i
      })
    }
    const actionProps = setupActionProps()
    const wrapper = shallow(<AddTagButton_withTheme tags={tags} {...actionProps}/>)

    //change to existing tag
    wrapper.setProps({tagId: 'key1'})
    expect(wrapper.find('AddTagButton').dive().state().tagName).toBe('name1')
    expect(wrapper.find('AddTagButton').dive().state().tagColor).toBe('color1')
    wrapper.setProps({tagId: 'key2'})
    expect(wrapper.find('AddTagButton').dive().state().tagName).toBe('name2')
    expect(wrapper.find('AddTagButton').dive().state().tagColor).toBe('color2')

    //change to none existing tag
    wrapper.setProps({tagId: 'awrongkey'})
    expect(wrapper.find('AddTagButton').dive().state().tagName).toBeNull()
    expect(wrapper.find('AddTagButton').dive().state().tagColor).toBeNull()
  })
})