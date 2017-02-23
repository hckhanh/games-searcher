import { createOpbeatMiddleware } from 'opbeat-react/redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

export default function createConfigureStore(reducers) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(reducers, composeEnhancers(
    applyMiddleware(
      thunk,
      createOpbeatMiddleware()
    )
  ))
}
