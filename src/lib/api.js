import axios from 'axios'
const version = 1
const basePath = '/api/'

const routes = {
  user: 'users',
  station: 'station',
}
function getBasePath () {
  return `${basePath}v${version}/`
}

function getStationsByPostCode (postCode, sort, grade) {
  return axios.get(`${getBasePath() + routes.station}/?postCode=${postCode}&sort=${sort}&grade=${grade}`)
}

function getStationsByLocation (locObj, sort, grade) {
  const query = `?lng=${locObj.lng}&lat=${locObj.lat}&dist=${locObj.dist}&sort=${sort}&grade=${grade}`
  return axios.get(`${getBasePath() + routes.station}/${query}`)
}

export { getStationsByLocation }
export { getStationsByPostCode }
export { version }
