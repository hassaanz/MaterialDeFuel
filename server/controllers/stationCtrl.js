const Station = require('../data/models/station')
const TankerKoenig = require('../dataConnector').tankerkoenig

function getStationByLocation (locObj, dist, options) {
  options = options || {}
  return Station.findAround({ lng: locObj.lng, lat: locObj.lat }, dist)
  .then((stations) => {
    if (!stations) {
      //  Query API if no station are found\
      const searchObj = {
        lat: locObj.lat,
        lng: locObj.lng,
        dist: dist,
        grade: options.grade || 'all',
        sortVal: options.sortVal || 'dist'
      }
      return TankerKoenig.circularSearch(searchObj)
      // @TODO Save stations locally
    }
    return stations
  })
  .catch((err) => {
    return {
      error: {
        msg: 'DB_ERR',
        obj: err,
        code: 202,
      }
    }
  })
}

function getStationByPostCode (postCode) {
  return Station.find({ 'location.postCode': postCode }).exec()
  .catch((err) => {
    return {
      error: {
        msg: 'DB_ERR',
        obj: err,
        code: 203
      }
    }
  })
}

function addStation (stationObj) {
  if (!stationObj) {
    const err = new Error({
      error: {
        msg: 'INV_REQ',
        obj: {
          message: 'No station data in request body',
          ref: 'POST /stations'
        },
        code: 1
      }
    })
    return Promise.reject(err)
  }
  const locationObj = stationObj.loc
  if (!locationObj) {
    const err = new Error({
      error: {
        msg: 'INV_REQ',
        obj: {
          message: 'No location data for station in request body',
          ref: 'POST /stations'
        },
        code: 1
      }
    })
    return Promise.reject(err)
  }
  return Station.fromObj(stationObj)
}
module.exports = {
  getStationByLocation: getStationByLocation,
  getStationByPostCode: getStationByPostCode,
  addStation: addStation,
}
