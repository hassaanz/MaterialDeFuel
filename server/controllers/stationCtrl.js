const Station = require('../data/models/station')
const TankerKoenig = require('../dataConnector').tankerkoenig

function getStationByLocation (locObj, dist, options) {
  // console.log('Searching stations...')
  options = options || {}
  return Station.findAround({ lng: locObj.lng, lat: locObj.lat }, dist)
  .then((stations) => {
    // console.log('Reponse from db:', stations)
    if (!stations) {
      // console.log('No Stations foudn in db trying tankerkoenig')
      //  Query API if no station are found
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
    // console.log('No Response from db')
    return stations
  })
  .catch((err) => {
    // console.log('ERROR HANDLER', err)
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
