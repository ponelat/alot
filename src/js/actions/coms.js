import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

// export contstant name
export const QUERY = 'QUERY'
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'

// export functionAction with standard obj signature

// Actions conform to FSA (flux-standard-actions)
// {type: string,payload: Any|Error, meta: obj, error: bool}

export const receiveResults = createAction(RECEIVE_RESULTS)


// export thunkActions, which return a fn => dispatch -> getState -> "should call dispatch" 
// export function query(str) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }

// Async example... dispatch(before) + fetch.then(dispatch(after))
export function fetchComs(str) {
  return dispatch => {
    // dispatch(requestPosts(reddit))
    return fetch('/com/' + str)
      .then(response => response.json())
      .then(json => dispatch(receiveResults({str, json})))
  }
}

// // state query fn... do they belong here?
// punction shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }


