import { List } from 'immutable'
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
        dispatch({ type: 'FETCH_ERROR', url: url })
        console.error(error, console.trace())
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
          dispatch({ type: 'GET_PRICES_SUCCESS', prices })
        })
        .catch(error => {
          dispatch({ type: 'FETCH_ERROR', url })
          console.error(error, console.trace())
        })
    } else {
      dispatch({ type: 'GET_PRICES_SUCCESS', prices: List() })
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
        dispatch({ type: 'FETCH_ERROR', url: url })
        console.error(error, console.trace())
      })
  }
}
