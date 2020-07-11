import React, {Component, PropTypes} from 'react'

import ColorPicker from './ColorPicker'

import RaisedButton  from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class CreateTagForm extends Component {
  static propTypes = {
    onSave: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      tagNameInputError: null,
      tagName: ''
    }
  }

  handleSave = (event) => {
    event.preventDefault()

    this.setState({
      tagNameInputError: this.state.tagName ? null : "Tag name is required"
    })
    const tag = this.state.tagName
    const color = this.colorInput.getValue()
    if (tag && color) {
      this.props.onSave(tag, color)
    }
  }

  handleChange = (e) => {
    this.setState({
      tagName: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <TextField
          hintText="Tag name"
          id="tag-name"
          errorText={this.state.tagNameInputError}
          value={this.state.tagName}
          onChange={this.handleChange}
        />
        <br/>
        <br/>
        <ColorPicker ref={color => this.colorInput = color}/>
        <br/>
        <br/>
        <RaisedButton
          secondary={true}
          fullWidth={true}
          label="Create tag"
          labelStyle={{textTransform: 'none'}}
          onClick={this.handleSave}
        />
      </form>
    )
  }
}

export default CreateTagForm