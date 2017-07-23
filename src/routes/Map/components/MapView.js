import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import './MapView.scss'

export const MapView = ({ center, zoom, setMapDefault }) => (
  <div className='mapView'>
    <GoogleMapReact
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <span>{center.lng} - {center.lat}</span>
    </GoogleMapReact>
  </div>
)

MapView.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  setMapDefault: PropTypes.func.isRequired,
}

export default MapView
