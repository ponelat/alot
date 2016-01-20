import React, { PropTypes } from 'react'

const images = {
  al: require('img/Pager-v2_03.gif'),
  o: require('img/Pager-v2_04.png'),
  o_selected: require('img/Pager-v2_05.gif'),
  ot: require('img/Pager-v2_06.gif')
}

export class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <input type="text" ref='text'/>
        <Button onClick={()=> this.props.onSearch(this.refs.text.value)}>Search</Button>
        </div>
    )
  }
}

export class Button extends React.Component {
  render() {
    return <button {...this.props}/>
  }
}

export class Checkbox extends React.Component {
  render() {
    return (
      <span>
        <label htmlFor={this.props.id}>
          {this.props.text}
        </label>
        <input name={this.props.id} type='checkbox' onChange={this.props.onChange} value={this.props.value}/>
      </span>
    )
  }
}

export class Pager extends React.Component {

  constructor(props) {
    super(props)
  }

  selectPage(i) {
    if(this.props.page === i)
      return
    this.props.onChange(i)
  }

  render() {
    let { pageSize, total, page }  = this.props
    let pages = Math.ceil(total / pageSize)
    let showPages = Array.from({length: pages})
    let pageSelectors = Math.min(pages, this.props.visiblePages)
    let offsetPage = page - (page % pageSelectors)
    let modPage = page % pageSelectors
    return (
      <div>
        <div style={Pager.styles.div} key={'prev'}>
          <a href="#" onClick={ e => { e.preventDefault(); this.selectPage(Math.max(page-1,0))} } >
            <img src={images.al} />
            <span style={Pager.styles.linkText}>prev</span>
          </a>
        </div>

        {
          n(pageSelectors).map((val, i) => {
            return (
              <div style={Pager.styles.div} key={i}>
                <a href="#" onClick={ e => { e.preventDefault(); this.selectPage(offsetPage + i)} } >
                  <img src={i === modPage ? images.o_selected : images.o} />
                  <span style={Pager.styles.linkText}>{i}</span>
                </a>
              </div>
              )
          }) 
        }

        <div style={Pager.styles.div} key={'next'}>
          <a href="#" onClick={ e => { e.preventDefault(); this.selectPage(Math.min(page+1, pages-1))} } >
            <img src={images.ot} />
            <span style={Pager.styles.linkText}>next</span>
          </a>
        </div>
      </div>
    )
  }
}

function n(num) {
  return new Array.from(({length: num}))
}

Pager.propTypes ={
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  visiblePages: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

Pager.defaultProps ={
  visiblePages: 7
}

Pager.styles = {
  linkText: {
    display: 'block',
    textAlign: 'center'
  },
  div: {
    display: 'inline-block'
  }
}

