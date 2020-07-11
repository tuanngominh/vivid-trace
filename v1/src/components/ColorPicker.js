import React, {Component, PropTypes} from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

export class ColorPickerItem extends Component {
  static propsTypes = {
    iconComponent: PropTypes.instanceOf(FontIcon),
    selectedIconComponent: PropTypes.instanceOf(FontIcon),
    selected: PropTypes.bool    
  }
  static defaultProps = {
    iconComponent: <FontIcon className="material-icons">lens</FontIcon>,
    selectedIconComponent: <FontIcon className="material-icons">radio_button_checked</FontIcon>,
    selected: false
  }
  render() {
    return (
      <IconButton 
        iconStyle={{color: this.props.color}}
        onClick={this.handleClick}
      >
        {
          this.props.selected
          ?
          this.props.selectedIconComponent
          :
          this.props.iconComponent
        }
      </IconButton>
    )
  }
  handleClick = () => {
    this.props.onClick(this.props.color)
  }
}

class ColorPicker extends Component {
  static propsTypes = {
    availableColors: PropTypes.array,
    itemPerRow: PropTypes.number,
    iconComponent: PropTypes.instanceOf(FontIcon)
  }
  static defaultProps = {
    availableColors: [
      '#ac725e', '#d06b64', '#f83a22', '#fa573c', '#ff7537', 
      '#ffad46', '#42d692', '#16a765', '#7bd148', '#b3dc6c', 
      '#fbe983', '#fad165', '#92e1c0', '#9fe1e7', '#9fc6e7',
      '#4986e7', '#9a9cff', '#b99aff', '#8f8f8f', '#cabdbf',
      '#cca6ac', '#f691b2', '#cd74e6', '#a47ae2', 'black'
    ],
    itemPerRow: 5
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.availableColors[0]
    }
  }

  handleClick = (e) => {
    this.setState({
      value: e
    })
  }

  getValue = () => {
    return this.state.value
  }
  
  render() {
    let jsx = []
    for (let i = 0; i < this.props.availableColors.length; i += this.props.itemPerRow) {
      //each icons row
      let jsxRow = []
      for (let j = 0; j < this.props.itemPerRow; j++) {
        if ((i+j) < this.props.availableColors.length) {
          let props = {
            key: this.props.availableColors[i+j],            
            color: this.props.availableColors[i+j],
            onClick: this.handleClick,
            selected: false
          }
          if (this.props.iconComponent) {
            props.iconComponent = this.props.iconComponent
          }
          if (this.props.selectedIconComponent) {
            props.selectedIconComponent = this.props.selectedIconComponent
          }
          if (this.state.value === this.props.availableColors[i+j]) {
            props.selected = true
          }
          jsxRow.push(
            <ColorPickerItem {...props} />
          )
        }
      }
      jsx.push(<div key={i} >{jsxRow}</div>)
    }
    return (
      <div>{jsx}</div>
    )
  }
}

export default ColorPicker