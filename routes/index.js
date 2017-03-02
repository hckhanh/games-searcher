const express = require('express')
const router = express.Router()
const api = require('./api')

const { FACEBOOK_APP_ID, APP_URL, APP_TITLE, APP_DESCRIPTION, APP_IMAGE } = process.env

/* GET Home page. */
router.get('/', function (req, res) {
  res.render('index', { FACEBOOK_APP_ID, APP_URL, APP_TITLE, APP_DESCRIPTION, APP_IMAGE })
})

router.use('/api', api)

module.exports = router
