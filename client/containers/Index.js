import React, { Component } from 'react'

export default class Index extends Component {
  render() {
    return (
      <div>
        <h2>Index</h2>
        {this.props.children}
      </div>
    )
  }
}
