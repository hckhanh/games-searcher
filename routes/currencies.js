const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const oerAPI = require('../apis/oer')
const cache = require('../cache')

router.get('/', function (req, res, next) {
  const currencies = cache.get('CURRENCIES')
  if (currencies) {
    return res.send(currencies)
  }

  fetch(oerAPI.EXCHANGE_RATES)
    .then(res => res.json())
    .then(currencies => {
      currencies = { base: currencies.base, rates: currencies.rates }
      cache.set('CURRENCIES', currencies, 3600)

      res.send(currencies)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router
