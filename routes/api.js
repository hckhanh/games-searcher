const express = require('express')
const router = express.Router()
const games = require('./games')
const rates = require('./rates')

router.use('/games', games)

router.use('/rates', rates)

module.exports = router
