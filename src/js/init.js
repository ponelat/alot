import ReactDOM from 'react-dom'
import React from 'react'
import App from 'comp/app'

// Render the app
window.onload = ()=> {
  ReactDOM.render(<App/>, document.getElementById('bundle'))
}
