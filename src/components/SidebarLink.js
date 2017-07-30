import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

const SidebarLink = (props) => (
  <Link to={`/${props.label}`} onClick={props.onTouchTap}>
    <MenuItem primaryText={props.label} checked={props.active} />
  </Link>
)

SidebarLink.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func,
}
SidebarLink.defaultProps = {
  active: false,
  label: 'Loading...'
}

export default SidebarLink
