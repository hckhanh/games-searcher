import { List, Map } from 'immutable'

const INITIAL_STATE = Map({
  topGames: List()
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_TOP_GAMES_SUCCESS':
      return state.merge({ topGames: action.topGames })
    default:
      return state
  }
}
