import React from 'react';

import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AddTagButton, {TagItem, TagItemList} from '../src/components/AddTagButton'

const tags = [
  {key: '1', id: '1', name: 'tag 1', color: '#ac725e'},
  {key: '2', id: '2', name: 'tag 2', color: '#8f8f8f'}
]

let manyTags = []
for (let i = 0; i < 30; i++) {
  manyTags.push({
    key: 'tag' + i,
    id: 'tag' + i,
    name: 'tag ' + i,
    color: ((i % 2) === 0) ? 'black': 'blue'
  })
}

const actionProps = () => ({
  onCreateTag: action('onCreateTag'),
  onFetchList: action('onFetchList'),
  onSelectTag: action('onSelectTag')
})


storiesOf('Tag', module)
  .add('Tag item', () => {
    return (
      <div style={{margin: 40}}>
        <TagItem 
          onSelectTag={action('onSelectTag')}
          name='Tag 1'
          colr='black'
          id='1'
        />
      </div>
    )
  })
  .add('Tag item list', () => {
    return (
      <div style={{margin: 40}}>
        <TagItemList 
          onSelectTag={action('onSelectTag')}
          tags={tags}
        />
      </div>
    )
  })  
  .add('No tag selection', () => {
    return (
      <div style={{margin: 40}}>
        <AddTagButton 
          {...actionProps()}
          tags={tags}
        />
      </div>
    )
  })
  .add('No tag selection, no existed tag', () => {
    return (
      <div style={{margin: 40}}>
        <AddTagButton 
          {...actionProps()}
          tags={[]}
        />
      </div>
    )
  })
  .add('With tag selection', () => {
    return (
      <div style={{margin: 40}}>
        <AddTagButton 
          {...actionProps()}
          tags={tags}
          tagName="Tag name" 
          tagColor="#ac725e" 
        />
      </div>
    )
  })
  .add('Show scroll bar when there are many existed tags', () => {
    return (
      <div style={{margin: 40}}>
        <AddTagButton 
          {...actionProps()}
          tags={manyTags}
          tagName="Tag name" 
          tagColor="#ac725e" 
        />
      </div>
    )
  })
