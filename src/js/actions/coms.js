import fetch from 'isomorphic-fetch'
import Qs from 'qs'
import { createAction } from 'redux-actions'

// export contstant name
export const QUERY = 'QUERY'
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'

// export functionAction with standard obj signature

// Actions conform to FSA (flux-standard-actions)
// {type: string,payload: Any|Error, meta: obj, error: bool}

export const receiveResults = createAction(RECEIVE_RESULTS)

/**
 * I am expecting the model defined in this published swagger spec
 * @swagger({url: './swagger.json'})
 * @client
 * @version 0.0.1
 * @GET /coms 
 */
// Async example... dispatch(before) + fetch.then(dispatch(after))
export function fetchComs({str, page}) {
  return (dispatch, getState) => {
    str = str ? str : getState().coms.str
    console.log('getState()', getState())
    console.log('str', str)
    return fetch('/com/' + str + '?' + Qs.stringify({page}))
      .then(response => response.json())
      .then(json => dispatch(receiveResults({str, json})))
  }
}

