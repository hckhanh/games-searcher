import { List, Map } from 'immutable'

const INITIAL_STATE = Map({
  games    : List(),
  hasPrices: true
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_GAMES_SUCCESS':
      return state.merge({ games: action.games, hasPrices: false })
    case 'CLEAR_GAMES':
      return state.merge({ games: List() })
    case 'GET_PRICES_SUCCESS':
      return state.merge({ games: action.games, hasPrices: true })
    default:
      return state
  }
}
