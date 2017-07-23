import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import SidebarLink from './SidebarLink'
import RaisedButton from 'material-ui/RaisedButton'
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
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.open !== this.state.open
  }

  render () {
    return (
      <div>
        <RaisedButton
          label='Toggle Drawer'
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <AppBar title='Menu' onLeftIconButtonTouchTap={this.handleToggle} />
          <IndexLink to='/'>
            <MenuItem>Home</MenuItem>
          </IndexLink>
          {
            this.props.routes.map((route, ind) => (
              <SidebarLink key={ind} label={route.name} active={route.active} />
            ))
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
