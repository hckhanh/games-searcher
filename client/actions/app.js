import fetch from 'axios'
import apis from '../apis'
import { createLoadingSelector } from '../reducers/loading'

export function getSuggestions(name) {
  return (dispatch, getState) => {
    const loadingSelector = createLoadingSelector('LOAD_APP')
    const state = getState()

    if (!loadingSelector(state)) {
      const url = apis.GET_SUGGESTIONS(encodeURIComponent(name))
      fetch(url)
        .then(({ data: games }) => {
          dispatch({ type: 'GET_SUGGESTIONS_SUCCESS', suggestions: games })
        })
        .catch(error => {
          dispatch({ type: 'FETCH_ERROR', error, url })
        })
    }
  }
}
