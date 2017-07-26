import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import './MapView.scss'

class MapView extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const self = this
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        if (self.props.center.lng !== lng && self.props.center.lat !== lat) {
          console.log('Setting center to:', lng, lat)
          self.props.setMapDefault({ lat, lng })
        }
      })
    }
  }

  render () {
    const {
      center,
      zoom,
      setMapDefault,
      setMapZoom,
      findStationsPoint,
      findStationsPostCode
    } = this.props
    return (
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
  }
}

MapView.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  setMapDefault: PropTypes.func.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  findStationsPostCode: PropTypes.func.isRequired,
  findStationsPoint: PropTypes.func.isRequired,
}

export default MapView
export { MapView }
