import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {

  static getNumber() {
    return ' 1'
  }

  getHello() {
    debugger
    return 'HELLO WORLD' + App.getNumber()
  }

  render() {
    return <span>{_.kebabCase(this.getHello())}</span>
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
