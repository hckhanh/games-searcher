const ITAD_API_KEY = process.env.ITAD_API_KEY

module.exports = {
  PLAINS_BY_ID  : `https://api.isthereanydeal.com/v01/game/plain/id?key=${ITAD_API_KEY}&shop=steam&ids=`,
  CURRENT_PRICES: `https://api.isthereanydeal.com/v01/game/prices?key=${ITAD_API_KEY}&plains=`
}
