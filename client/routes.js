import React from 'react'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import App from './App'
import GameDetails from './containers/GameDetails'
import Index from './containers/Index'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Index} />
      <Route path='games/:id' component={GameDetails} />
    </Route>
  </Router>
)
