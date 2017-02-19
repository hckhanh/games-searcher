import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import App from './containers/App'
import GameDetails from './containers/GameDetails'
import Home from './containers/Home'

export default ({ store }) => (
  <AppContainer>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='games/:id' component={GameDetails} />
          </Route>
        </Router>
      </Provider>
    </LocaleProvider>
  </AppContainer>
)
