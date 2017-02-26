const express = require('express')
const router = express.Router()
const users = require('./users')
const games = require('./games')
const currencies = require('./currencies')

router.use('/users', users)

router.use('/games', games)

router.use('/currencies', currencies)

module.exports = router
