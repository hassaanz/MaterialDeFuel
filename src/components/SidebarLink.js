import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

const SidebarLink = (props) => (
  <Link to={`/${props.label}`} onClick={props.onTouchTap}>
    <MenuItem active={props.active}>{props.label}</MenuItem>
  </Link>
)

SidebarLink.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onTouchTap: PropTypes.function,
}
SidebarLink.defaultProps = {
  active: false,
  label: 'Loading...'
}

export default SidebarLink
