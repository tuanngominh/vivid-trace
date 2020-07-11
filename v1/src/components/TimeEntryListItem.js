import React, {Component, PropTypes} from 'react'

import {toAmPm} from '../utils/time'

import {TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import FlatButton  from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import AddTagButtonContainer from './AddTagButtonContainer'

class TimeEntryListItem extends Component {
  static propTypes = {
    uid: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    tagId: PropTypes.string,
    onCreateTag: PropTypes.func,
    onSelectTag: PropTypes.func
  }

  componentWillMount() {
    this.setState({
      text: this.props.text
    })   
  }

  handleRemove = () => {
    this.props.onRemove(this.props.uid, this.props.id)
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleCreateTag = (tagName, color) => {
    this.props.onCreateTag(this.props.uid, this.props.id, tagName, color)
  }

  handleSelectTag = (tagId) => {
    this.props.onSelectTag(this.props.uid, this.props.id, tagId)
  }

  render() {
    return(
      <TableRow>
        <TableRowColumn>
          <div onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <TextField
              id='text'
              name='text'
              value={this.state.text}
              onChange={this.handleChangeText}
              underlineShow={false}
            />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <AddTagButtonContainer 
              onCreateTag={this.props.onCreateTag} 
              onSelectTag={this.props.onSelectTag} 
              tagId={this.props.tagId}
            />            
          </div>        
        </TableRowColumn>
        <TableRowColumn>{toAmPm(this.props.startTime)} - {toAmPm(this.props.endTime)}</TableRowColumn>
        <TableRowColumn>
          <div onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
            <FlatButton
              icon={<FontIcon className="material-icons" style={{color: 'grey', width: 50, fontSize: 20}}>delete</FontIcon>}
              onClick={this.handleRemove}
            />
          </div>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default TimeEntryListItem