import './styles/index.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducers from './reducers'
import Root from './routes'

// Create store for app state
const store = createStore(reducers)

function render() {
  ReactDOM.render(<Root store={store} />, document.getElementById('index'))
}

render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    store.replaceReducer(reducers)
    render()
  })
}
