import { List, Map } from 'immutable'

const INITIAL_STATE = Map({
  suggestions: List()
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return state.merge({ suggestions: action.suggestions })
    default:
      return state
  }
}
