const axios = require('axios')
const config = require('../../project.config')
const apiKey = config.tankerkoenigTestMode ? '00000000-0000-0000-0000-000000000002' : config.tankerkoenigKey
const apiBaseUrl = 'https://creativecommons.tankerkoenig.de/json/'

function circularSearch (searchObj) {
  const lat = searchObj.lat
  const lng = searchObj.lng
  const wheel = searchObj.dist
  const grade = searchObj.grade
  const sortVal = searchObj.sortVal
  if (!lat || !lng || !wheel || !grade || !sortVal) {
    const err = new Error({
      error: {
        msg: 'Invalid searchObj',
        code: 901,
        ref: 'circularSearch'
      }
    })
    return Promise.reject(err)
  }
  return axios.get(
    `${apiBaseUrl}list.php?lag=${lat}&lng=${lng}&rad=${wheel}&sort=${sortVal}&type=${grade}&apiKey=${apiKey}`
  )
}

function priceInquiry (stationIds) {
  if (!Array.isArray(stationIds)) {
    const err = new Error({
      error: {
        msg: 'Station Ids must be an array',
        code: 902,
        ref: 'priceInquiry'
      }
    })
    return Promise.reject(err)
  }
  return axios.get(`${apiBaseUrl}prices.php?ids=${stationIds.join(',')}&apiKey=${apiKey}`)
}
module.exports = {
  circularSearch: circularSearch,
  priceInquiry: priceInquiry
}
