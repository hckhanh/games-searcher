import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    )
  }
}
