import 'babel-polyfill'
import render from 'comp/render'

// Render the app
window.onload = ()=> {
  render(document.getElementById('bundle'))
}
