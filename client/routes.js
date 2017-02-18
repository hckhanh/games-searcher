import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { createStore } from 'redux'
import App from './containers/App'
import GameDetails from './containers/GameDetails'
import Home from './containers/Home'
import reducers from './reducers'

const store = createStore(reducers)

export default (
  <AppContainer>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='games/:id' component={GameDetails} />
        </Route>
      </Router>
    </Provider>
  </AppContainer>
)
