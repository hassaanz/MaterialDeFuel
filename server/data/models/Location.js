const mongoose = require('mongoose')

var LocationSchema = new mongoose.Schema({
  name: String,
  street: String,
  location: String,
  postCode: Number,
  houseNumber: String,
  loc: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2dsphere' // create the geospatial index
  }
})

let Location = mongoose.model('Location', LocationSchema)

/**
 * Creates a Location modal instance using a location  object
 * @param  {Object} locObj  The location object
 * @param {String}  locObj.name The name of location
 * @param {String}  locObj.street The street of location
 * @param {String}  locObj.location The location description
 * @param {Number}  locObj.postCode The post code of location
 * @param {String}  locObj.houseNumber  The house number of location
 * @param {Number}  locObj.lng  The longitude value of location
 * @param {Number}  locObj.lat  The latitude value of location
 * @return {Object}        Mongoose modal instance of location
 */
Location.statics.fromObj = (locObj) => {
  const name = locObj.name
  const street = locObj.street
  const location = locObj.location
  const postCode = locObj.postCode
  const houseNumber = locObj.houseNumber
  const lng = locObj.lng
  const lat = locObj.lat
  const LocObj = {
    name: name,
    street: street,
    location: location,
    postCode: postCode,
    houseNumber: houseNumber,
    loc: [lng, lat],
  }
  return new Location(LocObj)
}
/**
 * Find a location around the specified point
 * @param {Object} pointObj the point object where the search should be around
 * @param {Number} pointObj.lng The longitude value for the point
 * @param {Number} pointObj.lat The latitude value for the point
 * @param {Number} radius The radius distance for the search in kilometers
 */
Location.statics.findAround = (pointObj, radius) => {
  radius = radius || 8
  // we need to convert the distance to metres
  const metreDistance = radius * 1000
  if (pointObj && pointObj.lng && pointObj.lat) {
    return this.find({
      loc: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [pointObj.lng, pointObj.lat],
          },
        },
        $maxDistance: metreDistance
      }
    }).exec()
  } else {
    return Promise.reject(new Error('Invalid Point object'))
  }
}

module.exports = Location
