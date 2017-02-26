const OER_APP_ID = process.env.OER_APP_ID

module.exports = {
  EXCHANGE_RATES: `https://openexchangerates.org/api/latest.json?app_id=${OER_APP_ID}`
}
