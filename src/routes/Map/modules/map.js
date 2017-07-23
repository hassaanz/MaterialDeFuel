import { getStationsByLocation, getStationsByPostCode } from '../../../lib/api'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_MAP_CENTER = 'SET_MAP_CENTER'
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM'
export const FIND_STATIONS = 'FIND_STATIONS_POINT'
export const FIND_STATIONS_RES = 'FIND_STATIONS_RES'
export const FIND_STATIONS_ERR = 'FIND_STATIONS_ERR'
// ------------------------------------
// Actions
// ------------------------------------
export function setMapDefault (value = { lat: 59.95, lng: 30.33 }) {
  return {
    type    : SET_MAP_CENTER,
    payload : value
  }
}
export function setMapZoom (value = 2) {
  return {
    type    : SET_MAP_ZOOM,
    payload : value
  }
}

export function findStationsPoint (point = { lat: 50, lng: 50 }, dist = 8) {
  return (dispatch, getState) => {
    // Dispach finding event
    dispatch({
      type    : FIND_STATIONS,
      payload : { point: point, dist: dist }
    })
    const queryObj = Object.assign(point, { dist })
    return getStationsByLocation(queryObj)
    .then((stations) => {
      dispatch({
        type    : FIND_STATIONS_RES,
        payload : stations
      })
    })
    .catch((err) => {
      dispatch({
        type    : FIND_STATIONS_ERR,
        payload : err
      })
    })
  }
}

export function findStationsPostCode (postCode, sort = 'dist', grade = 'all') {
  return (dispatch, getState) => {
    dispatch({
      type    : FIND_STATIONS,
      payload : { postCode: postCode }
    })
    return getStationsByPostCode(postCode, sort, grade)
    .then((stations) => {
      dispatch({
        type    : FIND_STATIONS_RES,
        payload : stations
      })
    })
    .catch((err) => {
      dispatch({
        type    : FIND_STATIONS_ERR,
        payload : err
      })
    })
  }
}
export const actions = {
  setMapDefault,
  setMapZoom,
  findStationsPoint,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_MAP_CENTER]      : (state, action) => ({ ...state, center: action.payload }),
  [SET_MAP_ZOOM]        : (state, action) => ({ ...state, zoom: action.payload }),
  [FIND_STATIONS]       : (state, action) => ({ ...state, searching: true, query: action.payload }),
  [FIND_STATIONS_RES]   : (state, action) => ({ ...state, stations: action.payload, searching: false }),
  [FIND_STATIONS_ERR]   : (state, action) => ({ ...state, searching: false, error: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  center: { lng: 40.33, lat: 40 },
  zoom: 12,
  searching: false,
  error: null,
  query: null,
  stations: []
}
export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
