import { List, Map } from 'immutable'

const INITIAL_STATE = Map({
  gameDetail: Map(),
  gamePrices: List(),
  gameLoading: true,
  pricesLoading: true
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_GAME_DETAIL':
      return state.merge({ gameDetail: action.gameDetail })
    case 'GET_GAME_PRICES':
      return state.merge({ gamePrices: action.gamePrices })
    case 'SET_GAME_LOADING':
      return state.merge({ gameLoading: action.state })
    case 'SET_PRICES_LOADING':
      return state.merge({ pricesLoading: action.state })
    case 'RESET_GAME_DETAIL':
      return state.merge(INITIAL_STATE)
    default:
      return state
  }
}
