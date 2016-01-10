import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'comp/app'
import store from 'js/stores'

import initialState from 'js/initialState.json'


export default function render(component) {
  ReactDOM.render(
    <Provider store={store(initialState)}>
      <App />
    </Provider>,
  component)
}
