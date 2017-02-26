const express = require('express')
const router = express.Router()
const cache = require('../cache')
const fetch = require('node-fetch')
const oerAPI = require('../apis/oer')

router.get('/', function (req, res, next) {
  const rates = cache.get('RATES')
  if (rates) {
    return res.send(rates)
  }

  fetch(oerAPI.EXCHANGE_RATES)
    .then(res => res.json())
    .then(rates => {
      rates = { base: rates.base, rates: rates.rates }
      cache.set('RATES', rates, 3600)

      res.send(rates)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router
