import React from 'react'
import { SearchBox,Checkbox, Pager } from './ui.jsx'
import { fetchComs } from 'js/actions/coms'
import { connect } from 'react-redux'

import logoPng from 'img/logo.png'

const Banner = () => <img src={logoPng} alt="A Lot Of Dot Coms"/>

const Results = ({results=[], str}) => {
  let res = results.map( result => {
    return <li key={result}> {result} </li>
  })
  return (
    <div>
      <h2>Results for {str}</h2>
      {
        res.length > 0
          ?  (
            <ul>
              {res}
            </ul>
          )
          : <b> No results </b>
      }
    </div>
  )
}

class App extends React.Component {

  onSearch({str, page}) {
    this.props.dispatch( fetchComs({str, page}) )
  }

  render() {
    return (
      <div>
        <Banner/>
        <SearchBox onSearch={ str => this.onSearch({str})} />
        <Results results={this.props.results} str={this.props.str}/>
        <Pager page={this.props.page} pageSize={this.props.pageSize} total={this.props.totalResults} onChange={page => this.onSearch({page})}/>
      </div>
    )
  }

}

export default connect(state => state.coms)(App)
