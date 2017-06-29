import fetch from 'axios'
import Immutable from 'immutable'
import { lowerCase } from 'lodash-es'
import apis from '../apis'

export function getTopGames() {
  return dispatch => {
    dispatch({ type: 'CLEAR_GAMES' })
    dispatch({ type: 'LOAD_APP' })

    const url = apis.GET_TOP_GAMES()
    fetch(url)
      .then(({ data: games }) => {
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
    const home = getState().home
    let games = home.get('games')
    const appIds = games
      .filter(game => !game.get('is_free'))
      .map(game => `app/${game.get('app_id')}`)

    if (!appIds.isEmpty()) {
      const url = apis.GET_PRICES(encodeURIComponent(appIds.join(',')))
      fetch(url)
        .then(({ data: prices }) => {
          prices = Immutable.fromJS(prices)
          games = games.map(game => {
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
      .then(({ data: games }) => {
        dispatch({ type: 'LOAD_APP_DONE' })
        dispatch({ type: 'GET_GAMES_SUCCESS', games })
      })
      .catch(error => {
        dispatch({ type: 'LOAD_APP_DONE' })
        dispatch({ type: 'FETCH_ERROR', error, url })
      })
  }
}
