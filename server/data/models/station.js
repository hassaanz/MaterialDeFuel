const mongoose = require('mongoose')

const StationSchema = mongoose.Schema({
  name: String,
  brand: String,
  location: {
    street: String,
    location: String,
    postCode: Number,
    houseNumber: String,
    loc: {
      type: [Number], // [<longitude>, <latitude>]
      index: '2dsphere' // create the geospatial index
    }
  },
  openingHours: Array,
  extraHours: Array,
  prices: {
    e5: Number,
    e10: Number,
    diesel: Number,
  }
})

/**
 * Creates a Station modal instance using a json  object
 * @param  {Object} locObj  The location object
 * @param {String}  name The name of the station
 * @param {String}  locObj.street The street of location
 * @param {String}  locObj.place The place description
 * @param {Number}  locObj.postCode The post code of location
 * @param {String}  locObj.houseNumber  The house number of location
 * @param {Number}  locObj.lng  The longitude value of location
 * @param {Number}  locObj.lat  The latitude value of location
 * @return {Object}        Mongoose modal instance of location
 */
StationSchema.statics.fromObj = function (stationObj) {
  if (!stationObj.loc) {
    return Promise.reject(new Error('Station object must have location data'))
  }
  const name = stationObj.name
  const brand = stationObj.brand
  const street = stationObj.loc.street
  const location = stationObj.loc.location
  const postCode = stationObj.loc.postCode
  const houseNumber = stationObj.loc.houseNumber
  const lng = stationObj.loc.lng
  const lat = stationObj.loc.lat
  const extraHours = stationObj.extraHours
  const openingHours = stationObj.openingHours
  const prices = stationObj.prices
  const stationData = {
    name: name,
    brand: brand,
    location: {
      street: street,
      location: location,
      postCode: postCode,
      houseNumber: houseNumber,
      loc: [lng, lat],
    },
    openingHours: openingHours,
    extraHours: extraHours,
    prices: prices,
  }
  return new Station(stationData).save()
}

/**
 * Find a location around the specified station
 * @param {Object} pointObj the point object where the search should be around
 * @param {Number} pointObj.lng The longitude value for the point
 * @param {Number} pointObj.lat The latitude value for the point
 * @param {Number} radius The radius distance for the search in kilometers
 */
StationSchema.statics.findAround = function (pointObj, radius) {
  radius = radius || 8
  // we need to convert the distance to metres
  const metreDistance = radius * 1000
  if (pointObj && pointObj.lng && pointObj.lat) {
    const findProm = Station.find({
      loc: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [+pointObj.lng, +pointObj.lat],
          },
        },
        $maxDistance: +metreDistance
      }
    }).then((stations) => {
      console.log('Query Res:', stations)
      return Promise.resolve(stations)
    })
    return findProm
  } else {
    return Promise.reject(new Error('Invalid Point object'))
  }
}

const Station = mongoose.model('Station', StationSchema)
module.exports = Station
