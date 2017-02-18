import './styles/index.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './routes'

const render = (Component) => {
  ReactDOM.render(Component, document.getElementById('main'))
}

render(Root)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    render(Root)
  })
}
