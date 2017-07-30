import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import MapControls from './MapControls'
import UserPosition from './UserPosition'
import ActionMarker from './ActionMarker'
import './MapView.scss'

class MapView extends React.Component {
  constructor (props) {
    super(props)
    this.drawUserPos = this.drawUserPos.bind(this)
  }

  componentDidMount () {
    this.props.getUserPos()
  }

  drawUserPos () {
    const pos = { ...this.props.userPos }
    return (
      <UserPosition lng={pos.lng} lat={pos.lat} loading={pos.loading} err={pos.error} />
    )
  }

  drawActionMarker () {
    const pos = this.props.lastClick
    if (!pos) {
      return null
    }
    return (
      <ActionMarker lat={pos.lat} lng={pos.lng} />
    )
  }
  render () {
    const {
      defaultPos,
      center,
      defaultZoom,
      zoom,
      userPos,
      lastClick,
      setMapCenter,
      centerToPosition,
      setMapDefault,
      setMapZoom,
      findStationsPoint,
      findStationsPostCode,
      onSearchOptChange,
      mapClick,
      searchOpt,
      zipSearch,
      setZipSearch
    } = this.props
    return (
      <div className='row'>
        <div className='mapView col-md-10'>
          <GoogleMapReact
            defaultCenter={defaultPos}
            center={{ ...userPos, ...center }}
            defaultZoom={defaultZoom}
            zoom={zoom}
            onBoundsChange={console.log}
            onClick={mapClick}
          >
            {this.drawActionMarker()}
            {this.drawUserPos()}
          </GoogleMapReact>
        </div>
        <div className='mapResults col-md-2'>
          <MapControls
            findStationsPostCode={findStationsPostCode}
            findStationsPoint={findStationsPoint}
            setMapZoom={setMapZoom}
            setMapDefault={setMapDefault}
            setMapCenter={setMapCenter}
            userPos={userPos}
            activePos={lastClick}
            centerToPosition={centerToPosition}
            searchOpt={searchOpt}
            onSearchOptChange={onSearchOptChange}
            zipSearch={zipSearch}
            setZipSearch={setZipSearch}
          />
        </div>
      </div>
    )
  }
}

MapView.propTypes = {
  defaultPos: PropTypes.object.isRequired,
  center: PropTypes.object,
  userPos: PropTypes.object,
  lastClick: PropTypes.object,
  defaultZoom: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  getUserPos: PropTypes.func.isRequired,
  mapClick: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func.isRequired,
  setMapDefault: PropTypes.func.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  findStationsPostCode: PropTypes.func.isRequired,
  findStationsPoint: PropTypes.func.isRequired,
  centerToPosition: PropTypes.func.isRequired,
  onSearchOptChange: PropTypes.func.isRequired,
  searchOpt: PropTypes.string,
  zipSearch: PropTypes.string,
  setZipSearch: PropTypes.func.isRequired,
}

export default MapView
export { MapView }
