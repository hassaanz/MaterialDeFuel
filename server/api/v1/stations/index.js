const express = require('express')
const stationsRouter = express.Router()
const Station = require('../../../data/models/station')
const Location = require('../../../data/models/location')

stationsRouter.get('/:id', (req, res, next) => {
  Station.findById(req.params.id).exec()
  .then((station) => {
    return res.json(station)
  })
  .catch((err) => {
    return res.status(500).json({
      error: {
        msg: 'DB_ERR',
        obj: err,
        code: 201
      }
    })
  })
})

stationsRouter.post('/', (req, res, next) => {
  const station = req.body.station
  if (!station) {
    return res.status(400).json({
      error: {
        msg: 'INV_REQ',
        obj: {
          message: 'No station data in request body',
          ref: 'POST /stations'
        },
        code: 1
      }
    })
  }
  const locationObj = req.body.location
  if (!locationObj) {
    return res.status(400).json({
      error: {
        msg: 'INV_REQ',
        obj: {
          message: 'No location data for station in request body',
          ref: 'POST /stations'
        },
        code: 1
      }
    })
  }
  let locInst = new Location(locationObj)
  return locInst.save()
  .then((locObj) => {
    const stationObj = Object.assign({}, req.body.station, { location: locObj })
    return new Station(stationObj).save()
  })
})

/**
 * GET Stations around a location or by post code (zipcode)
 */
stationsRouter.get('/', (req, res, next) => {
  const lng = req.query.lng
  const lat = req.query.lat
  const dist = req.query.dist
  const postCode = req.query.postCode
  if (lng && lat && dist) {
    Station.findAround({ lng: lng, lat: lat }, dist)
    .then((stations) => {
      res.json(stations)
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          msg: 'DB_ERR',
          obj: err,
          code: 202,
        }
      })
    })
  } else {
    Station.find({ 'location.postCode': postCode }).exec()
    .then((stations) => {
      res.json(stations)
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          msg: 'DB_ERR',
          obj: err,
          code: 203
        }
      })
    })
  }
})
module.exports = stationsRouter
