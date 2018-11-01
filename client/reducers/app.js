import { message } from 'antd'
import { List, Map } from 'immutable'
import React from 'react'
import RestartMessage from '../component/RestartMessage'

const INITIAL_STATE = Map({
  loading: true,
  showError: false,
  suggestions: List(),
  backgroundUrl: null
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return state.merge({ suggestions: action.suggestions })
    case 'CLEAR_SUGGESTIONS':
      return state.merge({ suggestions: List() })
    case 'FETCH_ERROR':
      if (!state.get('showError')) {
        message.error(<RestartMessage />, 0)
        state = state.merge({ showError: true })
      }
      console.error(action.error)
      return state
    case 'UPDATE_BACKGROUND_URL':
      return state.merge({ backgroundUrl: action.backgroundUrl })
    default:
      return state
  }
}
