import fetch from 'axios'
import apis from '../apis'

export function getRates() {
  return dispatch => {
    const url = apis.GET_RATES()
    fetch(url)
      .then(({ data: exchangeRates }) => {
        dispatch({ type: 'GET_RATES_SUCCESS', exchangeRates })
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', error, url })
      })
  }
}

export function setCurrency(currency) {
  return { type: 'SET_CURRENCY', currency }
}
