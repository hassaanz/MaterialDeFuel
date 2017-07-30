import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import SidebarLink from './SidebarLink'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import { IndexLink } from 'react-router'

class Sidebar extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = { open: true }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.renderMenuItems = this.renderMenuItems.bind(this)
  }

  handleToggle () { this.setState({ open: !this.state.open }) }
  handleClose () { this.setState({ open: false }) }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.open !== this.state.open
  }
  renderMenuItems () {
    return this.props.routes.map((route, ind) => (
      <SidebarLink
        key={ind}
        label={route.name}
        active={route.active}
        onTouchTap={this.handleClose} />
    ))
  }
  render () {
    return (
      <div>
        <IconButton
          iconClassName='material-icons'
          onTouchTap={this.handleToggle}
        >menu</IconButton>
        <Drawer open={this.state.open} docked={false}>
          <AppBar title='Menu' onLeftIconButtonTouchTap={this.handleToggle} />
          <IndexLink to='/' onClick={this.handleClose}>
            <MenuItem>Home</MenuItem>
          </IndexLink>
          {
            this.renderMenuItems()
          }
        </Drawer>
      </div>
    )
  }
}

Sidebar.defaultProps = {
  routes: []
}

export default Sidebar
