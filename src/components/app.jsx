import React from 'react'
import { SearchBox,Checkbox } from './ui.jsx'
import { fetchComs } from 'js/actions/coms'
import { connect } from 'react-redux'

import logoPng from 'img/logo.png'

const Banner = () => <img src={logoPng} alt="A Lot Of Dot Coms"/>

const Results = ({results=[], query}) => {
  let res = results.map( result => {
    return <li> {result} </li>
  })
  return (
    <div>
      <h2>Results for {query}</h2>
      <ul>
        {res}
      </ul>
    </div>
  )
}

class App extends React.Component {

  onSearch(query) {
    this.props.dispatch( fetchComs(query) )
  }

  render() {
    return (
      <div>
        <Banner/>
        <SearchBox onSearch={this.onSearch.bind(this)} />
        <Results results={this.props.results} query={this.props.query}/>
      </div>
    )
  }

}

export default connect(state => state.coms)(App)
