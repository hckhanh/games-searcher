import React, { Component } from 'react'

export default class RestartMessage extends Component {
  render() {
    return (
      <span>
        Data cannot be loaded completely, please try again later or <a href='#' onClick={() => location.reload(true)}>refresh</a>
      </span>
    )
  }
}
