import { combineReducers } from 'redux'
import app from './app'
import currency from './currency'
import home from './home'

export default combineReducers({ currency, home, app })
