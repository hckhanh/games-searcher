import { List, Map } from 'immutable'

const INITIAL_STATE = Map({
  gameDetail: Map(),
  gamePrices: List(),
  gameLoading: true,
  pricesLoading: true
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_GAME_DETAIL_SUCCESS':
      return state.merge({ gameDetail: action.gameDetail })
    case 'GET_GAME_PRICES_SUCCESS':
      return state.merge({ gamePrices: action.gamePrices })
    case 'RESET_GAME_DETAIL':
      return state.merge(INITIAL_STATE)
    default:
      return state
  }
}
