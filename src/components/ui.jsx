import React, { PropTypes } from 'react'

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

  selectPage(i) {
    this.props.onChange(i)
  }

  render() {
    let { pageSize, total, page }  = this.props
    let pages = Array.from({length: Math.ceil(total / pageSize)})
    return (
      <ul style={Pager.styles.ul}>
        { pages.map((val, i) => {
          return (
            <li style={Pager.styles.li} key={i}>
              <Button style={{backgroundColor: page === i ? '#eee' : '#aaa'}} onClick={() => this.selectPage(i)}>{i}</Button>
            </li>
          )
        }) }
      </ul>
    )
  }
}

Pager.propTypes ={
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

Pager.styles = {
  ul: {
    listStyleType: 'none'
  },
  li: {
    display: 'inline'
  }
}

