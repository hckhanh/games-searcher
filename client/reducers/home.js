import Immutable, { List, Map } from 'immutable'

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
      const prices = Immutable.fromJS(action.prices)
      let games = state.get('games')

      games = games.map(game => {
        const itad_price = prices.find(price => price.get('app_id') === game.get('app_id'))
        return itad_price ? game.merge({ itad_price }) : game
      })

      return state.merge({ games, hasPrices: true })
    default:
      return state
  }
}
