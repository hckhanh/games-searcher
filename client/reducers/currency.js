import { Map } from 'immutable'

const INITIAL_STATE = Map({
  currency: localStorage.getItem('currency') || 'USD',
  exchangeRates: Map({
    base: 'USD',
    rates: Map()
  })
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_RATES_SUCCESS':
      return state.merge({ exchangeRates: action.exchangeRates })
    case 'SET_CURRENCY':
      localStorage.setItem('currency', action.currency)
      return state.merge({ currency: action.currency })
    default:
      return state
  }
}
