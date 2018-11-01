import { combineReducers } from 'redux'
import app from './app'
import currency from './currency'
import games from './games'
import home from './home'
import loading from './loading'

export default combineReducers({ currency, home, app, games, loading })
