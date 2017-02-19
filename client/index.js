import './styles/index.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducers from './reducers'
import Root from './routes'

// Create store for app state
const store = createStore(reducers)

function render(component) {
  ReactDOM.render(component, document.getElementById('index'))
}

render(<Root store={store} />)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    store.replaceReducer(reducers)
    render(<Root store={store} />)
  })
}
