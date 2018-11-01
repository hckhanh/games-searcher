import { List, Map } from 'immutable'

const INITIAL_STATE = Map({
  games: List()
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_GAMES_SUCCESS':
      return state.merge({ games: action.games })
    case 'CLEAR_GAMES':
      return state.merge({ games: List() })
    case 'GET_PRICES_SUCCESS':
      return state.merge({ games: action.games })
    default:
      return state
  }
}
