const mongoose = require('mongoose')

var FuelPriceSchema = new mongoose.Schema({
  date: Date,
  e5: Number,
  e10: Number,
  diesel: Number,
})

let FuelPrice = mongoose.model('FuelPrice', FuelPriceSchema)
module.exports = FuelPrice
