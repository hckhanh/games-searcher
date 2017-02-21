const express = require('express')
const router = express.Router()
const users = require('./users')
const games = require('./games')

router.use('/users', users)

router.use('/games', games)

module.exports = router
