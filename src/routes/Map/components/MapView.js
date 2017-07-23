import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import './MapView.scss'

export const MapView = ({
  center,
  zoom,
  setMapDefault,
  setMapZoom,
  findStationsPoint,
  findStationsPostCode
}) => (
  <div>
    <div className='mapView col-md-10'>
      <GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <span>{center.lng} - {center.lat}</span>
      </GoogleMapReact>
    </div>
    <div className='mapResults col-md-2'>
      asd
    </div>
  </div>
)

MapView.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  setMapDefault: PropTypes.func.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  findStationsPostCode: PropTypes.func.isRequired,
  findStationsPoint: PropTypes.func.isRequired,
}

export default MapView
