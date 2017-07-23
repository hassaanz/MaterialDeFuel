const express = require('express')
const stationsRouter = express.Router()
const Station = require('../../../data/models/station')
const StationCtrl = require('../../../controllers/stationCtrl')

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
  StationCtrl.addStation(station)
  .then((station) => {
    res.json(station)
  })
  .catch((err) => {
    const status = err.msg === 'INV_REQ' ? 400 : 500
    res.status(status).json(err)
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
  const sortVal = req.query.sort
  const grade = req.query.grade

  if (lng && lat && dist) {
    StationCtrl.getStationByLocation({ lng: lng, lat: lat }, dist, { grade: grade, sortVal: sortVal })
    .then((stations) => {
      res.json(stations)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  } else if (postCode) {
    StationCtrl.getStationByPostCode(postCode)
    .then((stations) => {
      res.json(stations)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  } else {
    res.status(400).json({
      error: {
        msg: 'INV_REQ',
        obj: {
          message: 'No Postcode of location information in request specified',
          ref: 'GET /stations/'
        }
      }
    })
  }
})
module.exports = stationsRouter
