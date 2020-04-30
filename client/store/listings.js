import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_LISTINGS = 'GET_ALL_LISTINGS'
const SET_URL = 'SET_URL'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  singleListing: {},
  allListings: [],
  url: ''
}

/**
 * ACTION CREATORS
 */
const getAllListings = listings => ({type: GET_ALL_LISTINGS, listings})
const setUrl = url => ({type: SET_URL, url})

/**
 * THUNK CREATORS
 */
export const fetchAllListings = () => async dispatch => {
  try {
    const res = await axios.get('/api/listings')
    dispatch(getAllListings(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const uploadListings = url => {
  return async (dispatch, getState) => {
    console.log('inside uploadListings')
    console.log(url, 'url')
    dispatch(setUrl(url))
    const state = getState()
    console.log(state, 'state in UploadListings')
    try {
      let res = await axios.post('/api/listings', {
        url: state.listings.url
      })
      dispatch(getAllListings(res.data || defaultUser))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchOnePuzzle = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/puzzles/${id}`)
      dispatch(getSinglePuzzle(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LISTINGS:
      return {...state, allListings: action.listings}
    case SET_URL:
      return {...state, url: action.url}
    default:
      return state
  }
}
