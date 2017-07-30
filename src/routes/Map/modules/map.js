import { getStationsByLocation, getStationsByPostCode } from '../../../lib/api'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_MAP_CENTER = 'SET_MAP_CENTER'
export const SET_MAP_DEFAULT = 'SET_MAP_DEFAULT'
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM'
export const FIND_STATIONS = 'FIND_STATIONS_POINT'
export const FIND_STATIONS_RES = 'FIND_STATIONS_RES'
export const FIND_STATIONS_ERR = 'FIND_STATIONS_ERR'
export const MAP_CLICK = 'MAP_CLICK'
export const SET_USER_POS = 'SET_USER_POS'
export const USER_POS_RES = 'USER_POS_RES'
export const USER_POS_ERR = 'USER_POS_ERR'
export const SET_SEARCH_OPT = 'SET_SEARCH_OPT'
export const SET_ZIP_SEARCH = 'SET_ZIP_SEARCH'
// ------------------------------------
// Actions
// ------------------------------------
export function mapClick (value) {
  const { lng, lat } = value
  return (dispatch, getState) => {
    dispatch({
      type    : MAP_CLICK,
      payload : { lng, lat },
    })
    const { center } = getState().map
    if (!center || (center.lat !== lat && center.lng !== lng)) {
      dispatch(setMapCenter({ lng, lat }))
    }
  }
}
export function setMapCenter (value = { lat: 59.95, lng: 30.33 }) {
  return {
    type    : SET_MAP_CENTER,
    payload : value
  }
}
export function setZipSearch (event, value) {
  return {
    type    : SET_ZIP_SEARCH,
    payload : value
  }
}
export function onSearchOptChange (ev, value = 'zip') {
  return {
    type    : SET_SEARCH_OPT,
    payload : value,
  }
}
export function setMapDefault (value = { lat: 59.95, lng: 30.33 }) {
  return {
    type    : SET_MAP_DEFAULT,
    payload : value
  }
}
export function setMapZoom (value = 2) {
  return {
    type    : SET_MAP_ZOOM,
    payload : value
  }
}
export function centerToPosition () {
  return (dispatch, getState) => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        dispatch({
          type    : SET_MAP_CENTER,
          payload : { lat, lng },
        })
      })
    }
  }
}
export function getUserPos () {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_POS,
    })
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        dispatch({
          type    : USER_POS_RES,
          payload : { lat, lng },
        })
      })
    } else {
      dispatch({
        type    : USER_POS_ERR,
        payload : { msg: 'Unable to get position information' },
      })
    }
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
  setMapCenter,
  setMapZoom,
  getUserPos,
  findStationsPoint,
  findStationsPostCode,
  centerToPosition,
  mapClick,
  onSearchOptChange,
  setZipSearch
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAP_CLICK]           : (state, action) => ({ ...state, lastClick: action.payload }),
  [SET_MAP_DEFAULT]     : (state, action) => ({ ...state, defaultPos: action.payload }),
  [SET_MAP_CENTER]      : (state, action) => ({ ...state, center: action.payload }),
  [SET_MAP_ZOOM]        : (state, action) => ({ ...state, zoom: action.payload }),
  [FIND_STATIONS]       : (state, action) => ({ ...state, searching: true, query: action.payload }),
  [FIND_STATIONS_RES]   : (state, action) => ({ ...state, stations: action.payload, searching: false }),
  [FIND_STATIONS_ERR]   : (state, action) => ({ ...state, searching: false, error: action.payload }),
  [SET_SEARCH_OPT]      : (state, action) => ({ ...state, searchOpt: action.payload }),
  [SET_ZIP_SEARCH]      : (state, action) => ({ ...state, zipSearch: action.payload }),
  [SET_USER_POS]        : (state, action) => (
    { ...state,
      userPos: {
        ...state.userPos,
        loading: true
      }
    }
  ),
  [USER_POS_RES] : (state, action) => (
    { ...state,
      userPos: {
        ...action.payload,
        loading: false,
        err: null
      }
    }
  ),
  [USER_POS_ERR] : (state, action) => (
    { ...state,
      userPos: {
        ...state.userPos,
        loading: false,
        err: action.payload
      }
    }
  )
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  defaultPos: { lng: 40.33, lat: 40 },
  searchOpt: 'position',
  zipSearch: null,
  defaultZoom: 12,
  center: null,
  zoom: null,
  lastClick: null,
  userPos: null,
  searching: false,
  error: null,
  query: null,
  stations: []
}
export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
