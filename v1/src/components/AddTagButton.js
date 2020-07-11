import React, {Component, PropTypes} from 'react'

import CreateTagForm from './CreateTagForm'

import FlatButton  from 'material-ui/FlatButton'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

export class TagItem extends Component {
  static propTypes = {
    onSelectTag: PropTypes.func,
    name: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string
  }

  handleSelectTag = () => {
    const {onSelectTag, id, name, color} = this.props    
    onSelectTag(id, name, color)
  }

  render() {
    return (
      <ListItem
        className='list-item' 
        primaryText={this.props.name} 
        leftIcon={<FontIcon className="material-icons" style={{color: this.props.color}}>lens</FontIcon>} 
        onClick={this.handleSelectTag}
      />      
    )
  }
}

export class TagItemList extends Component {
  static propTypes = {
    onSelectTag: PropTypes.func,
    tags: PropTypes.array,
    dialogMaxHeight: PropTypes.number
  }

  static defaultProps = {
    tags: [],
    dialogMaxHeight: 300
  }

  state = {
    filterTag: ''
  }

  componentDidMount () {
    this.findTag.focus()
  }

  handleFilterTagChange = (e) => {
    this.setState({
      filterTag: e.target.value
    })
  }
  render() {
    return (
      <div>
        <List className="list first">
          <FontIcon className="material-icons" style={{
            color: 'lightgrey', 
            fontSize: 18,
            top: 5,
            paddingRight: 8
          }}>search</FontIcon>
          <TextField
            id="find-tag"
            underlineShow={false}
            hintText="Find Tag"
            className="input-filter"
            ref={node => this.findTag = node}
            value={this.state.filterTag}
            onChange={this.handleFilterTagChange}
          />
        </List>
        <Divider />
        <List className="list" style={{maxHeight: this.props.dialogMaxHeight, 'overflowY': 'scroll', 'overflowX': 'hidden'}}>
          {this.props.tags.map((tag) => {
            if (this.state.filterTag === '' || tag.name.indexOf(this.state.filterTag) !== -1) {
              return (
                <TagItem key={tag.key} id={tag.key} onSelectTag={this.props.onSelectTag} {...tag} />
              )
            } else {
              return undefined;
            }
          })}
        </List>
      </div>
    )
  }
}

export class TagButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    tagName: PropTypes.string,
    tagColor: PropTypes.string    
  }

  render() {
    return(
      this.props.tagName
      ?
        <FlatButton
          onClick={this.props.onClick}
          label={this.props.tagName}
          labelStyle={{color: this.props.tagColor, textTransform: 'none'}}
          icon={<FontIcon className="material-icons" style={{color: this.props.tagColor, fontSize: 20}}>lens</FontIcon>}
        />
      :
        <FlatButton
          onClick={this.props.onClick}
          label="Tag"
          labelStyle={{textTransform: 'none'}}
          icon={<FontIcon className="material-icons" style={{color: 'green', fontSize: 30}}>add</FontIcon>}
        />      
    )
  }
}

class AddTagButton extends Component {
  static propTypes = {
    onCreateTag: PropTypes.func,
    onFetchList: PropTypes.func,
    onSelectTag: PropTypes.func,
    tags: PropTypes.array,
    tagId: PropTypes.string,
    dialogMaxHeight: PropTypes.number
  }

  constructor (props) {
    super(props)
    const tagValue = this.getTagButtonValue(props.tagId, props)

    this.state = {
      openTagForm: false,
      createTagDialogOpen: false,
      tagName: tagValue ? tagValue.name : null,
      tagColor: tagValue ? tagValue.color : null,
      tagId: props.tagId ? props.tagId : null
    }
  }

  getTagButtonValue = (tagId, props) => {
    let result = null
    if (props.tags && props.tags.length && props.tags.length > 0) {
      props.tags.forEach((tag) => {
        if (tag.key === tagId) {
          result = tag
          return false
        }
      })
    }
    return result
  }

  componentWillReceiveProps(nextProps) {
    //we got tagId pass in
    if ('tagId' in nextProps) {
      if (nextProps.tagId) {
        //if tags available in nextProps use it
        let props = null
        if (nextProps.tags && nextProps.tags.length && nextProps.tags.length > 0) {
          props = nextProps
        } else if (this.props.tags && this.props.tags.length && this.props.tags.length > 0) {
          props = this.props
        }

        if (!props) {
          return
        }
        const tagValue = this.getTagButtonValue(nextProps.tagId, props)
        if (tagValue) {
          this.setState({
            tagName: tagValue.name,
            tagColor: tagValue.color
          })
        }
      } 
      //empty tag id
      else {
        this.setState({
          tagName: null,
          tagColor: null
        })        
      }
    }
  }

  componentWillMount() {
    this.props.onFetchList()
  }

  handleOpenTagForm = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      openTagForm: true,
      anchorEl: event.currentTarget,
    })    
  }

  handleCloseTagForm = () => {
    this.setState({
      openTagForm: false,
    });
  }

  handleOpenCreateTagDialog = () => {
    this.setState({
      createTagDialogOpen: true,
      openTagForm: false
    })
  }

  handleCloseCreateTagDialog = () => {
    this.setState({
      createTagDialogOpen: false
    })
  }

  handleCreateTag = (tag, color) => {
    this.props.onCreateTag(tag, color)
    this.handleCloseCreateTagDialog()
  }

  handleSelectTag = (tagId, tagName, tagColor) => {    
    this.props.onSelectTag(tagId)
    this.setState({tagName, tagColor})
    this.handleCloseTagForm()
  }

  render() {
    return (
      <div className="container-add-tag">
        <TagButton onClick={this.handleOpenTagForm} tagName={this.state.tagName} tagColor={this.state.tagColor} />
        <Popover
          open={this.state.openTagForm}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleCloseTagForm}
          animation={PopoverAnimationVertical}
          style={{
            paddingLeft: 10,
            paddingRight: 10
          }}
          className="container-add-tag-popup"
        >
          {
            ('tags' in this.props && this.props.tags && this.props.tags.length > 0) &&
              <TagItemList onSelectTag={this.handleSelectTag} tags={this.props.tags} dialogMaxHeight={this.props.dialogMaxHeight} />
          }
          <List className="list">
            <div style={{textAlign: 'center'}}>
              <FlatButton
                label="Add Tag"
                labelStyle={{textTransform: 'none'}}
                icon={<FontIcon className="material-icons" style={{color: 'lightgreen'}}>add</FontIcon>}
                onClick={this.handleOpenCreateTagDialog}
              />
            </div>
          </List>
        </Popover>
        <Dialog
          title="Create new tag"
          open={this.state.createTagDialogOpen}
          onRequestClose={this.handleCloseCreateTagDialog}
          contentStyle={{maxWidth: 400}}
        >
          <CreateTagForm onSave={this.handleCreateTag}/>
        </Dialog>        
      </div>
    )
  }
}

export default AddTagButton