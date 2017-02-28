import { List, Map } from 'immutable'
import { captureError, setExtraContext } from 'opbeat-react'

const INITIAL_STATE = Map({
  loading    : true,
  suggestions: List()
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return state.merge({ suggestions: action.suggestions })
    case 'CLEAR_SUGGESTIONS':
      return state.merge({ suggestions: List() })
    case 'LOAD_APP':
      return state.merge({ loading: true })
    case 'LOAD_APP_DONE':
      return state.merge({ loading: false })
    case 'FETCH_ERROR':
      setExtraContext({ api: action.url })
      captureError(action.error)
      return state
    default:
      return state
  }
}
