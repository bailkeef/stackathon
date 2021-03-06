import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_LISTINGS = 'GET_ALL_LISTINGS'
const SET_ZIPCODE = 'SET_ZIPCODE'
const TEXT_LISTING = 'TEXT_LISTING'
/**
 * INITIAL STATE
 */
const initialState = {
  singleListing: {},
  allListings: [],
  zipcode: ''
}

/**
 * ACTION CREATORS
 */
const getAllListings = listings => ({type: GET_ALL_LISTINGS, listings})
const setZipcode = zipcode => ({type: SET_ZIPCODE, zipcode})

/**
 * THUNK CREATORS
 */
export const fetchAllListings = () => async dispatch => {
  try {
    const res = await axios.get('/api/listings')
    dispatch(getAllListings(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const uploadListings = zipcode => {
  return async (dispatch, getState) => {
    dispatch(setZipcode(zipcode))
    const state = getState()
    try {
      let res = await axios.post('/api/listings', {
        zipcode: state.listings.zipcode
      })
      dispatch(getAllListings(res.data || initialState))
      // dispatch(getAllListings(res.data || initialState))
    } catch (err) {
      console.error(err)
    }
  }
}

// export const fetchOnePuzzle = id => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(`/api/puzzles/${id}`)
//       dispatch(getSinglePuzzle(data))
//     } catch (error) {
//       dispatch(console.error(error))
//     }
//   }
// }

export const textListings = message => async dispatch => {
  try {
    const res = await axios.post('/api/listings/text', {message})
    dispatch(getAllListings(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LISTINGS:
      return {...state, allListings: action.listings}
    case SET_ZIPCODE:
      return {...state, zipcode: action.zipcode}
    default:
      return state
  }
}
