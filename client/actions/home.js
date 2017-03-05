import Immutable from 'immutable'
import { lowerCase } from 'lodash'
import apis from '../apis'

export function getTopGames() {
  return dispatch => {
    dispatch({ type: 'CLEAR_GAMES' })
    dispatch({ type: 'LOAD_APP' })

    const url = apis.GET_TOP_GAMES()
    fetch(url)
      .then(res => res.json())
      .then(games => {
        dispatch({ type: 'LOAD_APP_DONE' })
        dispatch({ type: 'GET_GAMES_SUCCESS', games })
      })
      .catch(error => {
        dispatch({ type: 'LOAD_APP_DONE' })
        dispatch({ type: 'FETCH_ERROR', error, url })
      })
  }
}

export function getPrices() {
  return (dispatch, getState) => {
    const state = getState()
    const appIds = state.home.get('games')
                        .filter(game => !game.get('is_free'))
                        .map(game => `app/${game.get('app_id')}`)

    if (!appIds.isEmpty()) {
      const url = apis.GET_PRICES(encodeURIComponent(appIds.join(',')))
      fetch(url)
        .then(res => res.json())
        .then(prices => {
          prices = Immutable.fromJS(prices)
          const games = state.home.get('games').map(game => {
            const itad_price = prices.find(price => price.get('app_id') === game.get('app_id'))
            return itad_price ? game.merge({ itad_price }) : game
          })

          dispatch({ type: 'GET_PRICES_SUCCESS', games })
        })
        .catch(error => {
          dispatch({ type: 'FETCH_ERROR', error, url })
        })
    }
  }
}

export function searchGames(name) {
  return dispatch => {
    dispatch({ type: 'CLEAR_SUGGESTIONS' })
    dispatch({ type: 'CLEAR_GAMES' })
    dispatch({ type: 'LOAD_APP' })

    const url = apis.SEARCH_GAMES(encodeURIComponent(lowerCase(name)))
    fetch(url)
      .then(res => res.json())
      .then(games => {
        dispatch({ type: 'LOAD_APP_DONE' })
        dispatch({ type: 'GET_GAMES_SUCCESS', games })
      })
      .catch(error => {
        dispatch({ type: 'LOAD_APP_DONE' })
        dispatch({ type: 'FETCH_ERROR', error, url })
      })
  }
}
