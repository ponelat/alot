import React from 'react'

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
