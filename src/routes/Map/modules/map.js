// ------------------------------------
// Constants
// ------------------------------------
export const SET_MAP_CENTER = 'SET_MAP_CENTER'
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM'
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

export const actions = {
  setMapDefault,
  setMapZoom
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_MAP_CENTER]     : (state, action) => ({ ...state, center: action.payload }),
  [SET_MAP_ZOOM]        : (state, action) => ({ ...state, zoom: action.payload }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  center: { lng: 40.33, lat: 40 },
  zoom: 12
}
export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
