export default {
  GET_TOP_GAMES  : () => `${API_URL}/games`,
  GET_PRICES     : appIds => `${API_URL}/games/prices?appIds=${appIds}`,
  GET_SUGGESTIONS: name => `${API_URL}/games/suggestions?name=${name}`,
  SEARCH_GAMES   : name => `${API_URL}/games/search?name=${name}`
}
