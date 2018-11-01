import fetch from 'axios'
import apis from '../apis'

export function getGameDetail(appId) {
  return dispatch => {
    dispatch({ type: 'LOAD_APP_REQUEST' })
    dispatch({ type: 'GET_GAME_DETAIL_REQUEST' })
    fetch(apis.GET_GAME_DETAIL(appId))
      .then(({ data: gameDetail }) => {
        dispatch({ type: 'GET_GAME_DETAIL_SUCCESS', gameDetail })
        dispatch({ type: 'UPDATE_BACKGROUND_URL', backgroundUrl: gameDetail.background })
        dispatch({ type: 'LOAD_APP_DONE' })
      })
  }
}

export function getGamePrices(appId) {
  return dispatch => {
    dispatch({ type: 'GET_GAME_PRICES_REQUEST' })
    fetch(apis.GET_GAME_PRICES(appId))
      .then(({ data: gamePrices }) => {
        dispatch({ type: 'GET_GAME_PRICES_SUCCESS', gamePrices })
      })
  }
}

export function resetGameDetail() {
  return { type: 'RESET_GAME_DETAIL' }
}
