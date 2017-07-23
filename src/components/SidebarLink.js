import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

const SidebarLink = (props) => (
  <Link to={`/${props.label}`}>
    <MenuItem active={props.active}>{props.label}</MenuItem>
  </Link>
)

SidebarLink.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
}
SidebarLink.defaultProps = {
  active: false,
  label: 'Loading...'
}

export default SidebarLink
