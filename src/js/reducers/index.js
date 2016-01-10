import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

// Get Actions

import {
  RECEIVE_RESULTS
} from '../actions/coms'

const comDefaults = {
  query: '',
  results: []
}

const coms = handleActions({
  RECEIVE_RESULTS: (state, action) => {
    let newState = Object.assign({}, state)
    newState.query = action.payload.str
    newState.results = action.payload.json
    return newState
  }
}, comDefaults)

// function selectedReddit(state = 'reactjs', action) {
//   switch (action.type) {
//     case SELECT_REDDIT:
//       return action.reddit
//     default:
//       return state
//   }
// }

// function posts(state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) {
//   switch (action.type) {
//     case INVALIDATE_REDDIT:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       })
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_POSTS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }

// function postsByReddit(state = { }, action) {
//   switch (action.type) {
//     case INVALIDATE_REDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.reddit]: posts(state[action.reddit], action)
//       })
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  coms,
})

export default rootReducer
