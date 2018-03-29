import fetch from 'axios'
import apis from '../apis'

export function getGameDetail(appId) {
  return dispatch => {
    dispatch({ type: 'LOAD_APP' })
    fetch(apis.GET_GAME_DETAIL(appId))
      .then(({ data: gameDetail }) => {
        dispatch({ type: 'GET_GAME_DETAIL', gameDetail })
        dispatch({ type: 'UPDATE_BACKGROUND_URL', backgroundUrl: gameDetail.background })
        dispatch({ type: 'SET_GAME_LOADING', state: false })
        dispatch({ type: 'LOAD_APP_DONE' })
      })
  }
}

export function getGamePrices(appId) {
  return dispatch => {
    fetch(apis.GET_GAME_PRICES(appId))
      .then(({ data: gamePrices }) => {
        dispatch({ type: 'GET_GAME_PRICES', gamePrices })
        dispatch({ type: 'SET_PRICES_LOADING', state: false })
      })
  }
}

export function resetGameDetail() {
  return { type: 'RESET_GAME_DETAIL' }
}
