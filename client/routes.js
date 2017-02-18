import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { createStore } from 'redux'
import App from './App'
import GameDetails from './containers/GameDetails'
import Index from './containers/Index'
import reducers from './reducers'

const store = createStore(reducers)

export default (
  <AppContainer>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Index} />
          <Route path='games/:id' component={GameDetails} />
        </Route>
      </Router>
    </Provider>
  </AppContainer>
)
