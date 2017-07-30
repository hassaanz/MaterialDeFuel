import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import { red500 } from 'material-ui/styles/colors'

const MARKER_SIZE = 40
const actionMarkerStyle = {
  position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  left: -MARKER_SIZE / 2,
  top: -MARKER_SIZE / 2
}

export const ActionMarker = ({ lat, lng }) => (
  <IconButton style={actionMarkerStyle}
    iconClassName='mdi mdi-map-marker'
    iconStyle={{ color: red500 }} />
)
ActionMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default ActionMarker
