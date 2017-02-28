import './styles/index.less'
import initOpbeat from 'opbeat-react'
import React from 'react'
import ReactDOM from 'react-dom'
import createConfigureStore from './configureStore'
import reducers from './reducers'
import Routers from './routers'

if (process.env.NODE_ENV === 'production') {
  initOpbeat({
    orgId: process.env.OPBEAT_ORG_ID,
    appId: process.env.OPBEAT_WEB_APP_ID
  })
}

// Create store for app state
const store = createConfigureStore(reducers)

function render() {
  ReactDOM.render(<Routers store={store} />, document.getElementById('index'))
}

render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routers', () => {
    store.replaceReducer(reducers)
    render()
  })
}
