const API_URL = process.env.API_URL

export default {
  GET_TOP_GAMES  : () => `${API_URL}/gamess`,
  GET_PRICES     : appIds => `${API_URL}/games/prices?appIds=${appIds}`,
  GET_SUGGESTIONS: name => `${API_URL}/games/suggestions?name=${name}`,
  SEARCH_GAMES   : name => `${API_URL}/games/search?name=${name}`,
  GET_RATES      : () => `${API_URL}/rates`
}
