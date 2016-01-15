import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

// Get Actions

import {
  RECEIVE_RESULTS
} from '../actions/coms'

const comDefaults = {
  str: '',
  results: [],
  page: 0,
  pageSize: 10,
  totalResults: 0
}

const coms = handleActions({
  RECEIVE_RESULTS: (state, action) => {
    let newState = Object.assign({}, state, action.payload.json)
    return newState
  }
}, comDefaults)

const rootReducer = combineReducers({
  coms,
})

export default rootReducer
