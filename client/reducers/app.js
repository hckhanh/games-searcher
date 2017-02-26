import { List, Map } from 'immutable'
import fx from 'money'

function getCurrencyFromLocal() {
  return localStorage.getItem('currency') || 'USD'
}

const INITIAL_STATE = Map({
  suggestions: List(),
  loading    : true,
  currency   : getCurrencyFromLocal(),
  rates      : List()
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return state.merge({ suggestions: action.suggestions })
    case 'CLEAR_SUGGESTIONS':
      return state.merge({ suggestions: List() })
    case 'LOAD_APP':
      return state.merge({ loading: true })
    case 'LOAD_APP_DONE':
      return state.merge({ loading: false })
    case 'GET_RATES_SUCCESS':
      const { base, rates } = action.rates
      fx.base = base
      fx.rates = rates

      return state.merge({
        currency: getCurrencyFromLocal(),
        rates   : Object.keys(rates)
      })
    case 'SET_CURRENCY':
      localStorage.setItem('currency', action.currency)
      return state.merge({ currency: action.currency })
    default:
      return state
  }
}
