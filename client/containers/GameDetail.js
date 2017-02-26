import React, { Component } from 'react'
import { updateNumber } from '../actions/home'

// @connect(
//   state => ({
//     home: state.home
//   }),
//   dispatch => ({
//     updateNumber: bindActionCreators(updateNumber, dispatch)
//   })
// )
export default class GameDetails extends Component {
  handleUpdateNumber = () => {
    console.log(this.props)
    // this.props.updateNumber(this.props.home.get('number') + 20)
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  render() {
    return (
      <div>
        <h2>Game Details home</h2>
        <button onClick={this.handleUpdateNumber}>Update number</button>
      </div>
    )
  }
}
