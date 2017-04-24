import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import App from './containers/App'
import GameDetail from './containers/GameDetail'
import Home from './containers/Home'

export default ({ store }) => (
  <AppContainer>
    <LocaleProvider locale={enUS}>
      <IntlProvider locale='en'>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path='/' component={App}>
              <IndexRoute component={Home} />
              <Route path='games/:id' component={GameDetail} />
            </Route>
          </Router>
        </Provider>
      </IntlProvider>
    </LocaleProvider>
  </AppContainer>
)
