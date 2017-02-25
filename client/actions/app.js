import apis from '../apis'

export function getSuggestions(name) {
  return dispatch => {
    const url = apis.GET_SUGGESTIONS(encodeURIComponent(name))
    fetch(url)
      .then(res => res.json())
      .then(games => {
        dispatch({ type: 'GET_SUGGESTIONS_SUCCESS', suggestions: games })
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', url: url })
        console.error(error, console.trace())
      })
  }
}
