import { Map } from 'immutable'

const INITIAL_STATE = Map({
  topGames: null
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_TOP_GAMES_SUCCESS':
      return state.set('number', action.number)
    case 'GET_TOP_GAMES_FAILED':
      return state.set('number', action.number)
    default:
      return state
  }
}
