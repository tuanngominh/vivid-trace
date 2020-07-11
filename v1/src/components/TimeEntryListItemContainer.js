import React, {Component} from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'

import {remove} from '../actions/timeEntries'
import {assignTagToTimeEntry, assignTagIdToTimeEntry} from '../actions/tags'

import TimeEntryListItem from './TimeEntryListItem'

class TimeEntryListItemContainer extends Component {
  handleCreateTag = (tagName, tagColor) => {
    this.props.onCreateTag(this.props.uid, this.props.id, tagName, tagColor)
  }

  handleSelectTag = (tagId) => {
    this.props.onSelectTag(this.props.uid, this.props.id, tagId)
  }
  render() {
    return (
      <TimeEntryListItem 
        {...this.props} 
        onCreateTag={this.handleCreateTag} 
        onSelectTag={this.handleSelectTag}
      />
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onRemove: (uid, entryId) => {
      dispatch(remove(uid, entryId))
    },
    onCreateTag: (uid, entryId, tagName, tagColor) => {
      dispatch(assignTagToTimeEntry(uid, entryId, tagName, tagColor))
    },
    onSelectTag: (uid, entryId, tagId) => {
      dispatch(assignTagIdToTimeEntry(uid, entryId, tagId))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    uid: get(state,"auth.user.uid", null)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeEntryListItemContainer)
