import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import { indigo500 } from 'material-ui/styles/colors'

export const UserPosition = ({ lat, lng }) => (
  (lat && lng) ? <IconButton
    iconClassName='mdi mdi-car'
    iconStyle={{ color: indigo500 }} /> : null
)
UserPosition.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
}

export default UserPosition
