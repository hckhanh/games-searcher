const express = require('express')
const router = express.Router()
const api = require('./api')

/* GET Home page. */
router.get('/', function (req, res) {
  res.render('index')
})

router.use('/api', api)

module.exports = router
