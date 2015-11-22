import React from 'react'

import logoPng from 'img/logo.png'

const Banner = () => <img src={logoPng} alt="A Lot Of Dot Coms"/>

const SearchBox = ({onSearch}) => (<div> <input type='text' /> <button onClick={onSearch || ()=> {}}> Search </button></div> )

const Results = ({results, query}) => {
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

  render() {
    return (
      <div>
        <Banner/>
        <SearchBox onSearch={this.onSearch} />
        <Results results={['one', 'two', 'three']} query={'hello'}/>
      </div>
    )
  }

}

export default App



