export function getTopGames() {
  return dispatch => {
    fetch(API_URL + '/games')
      .then(res => res.json())
      .then(topGames => {
        dispatch({ type: 'GET_TOP_GAMES_SUCCESS', topGames })
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', url: '/games' })
        console.error(error, console.trace())
      })
  }
}
