const express = require('express')
const router = express.Router()
const api = require('./api')

const { FACEBOOK_APP_ID, APP_URL, APP_TITLE, APP_DESCRIPTION, APP_IMAGE } = process.env

let APP_CSS = '/index.css', APP_JS = '/index.js'
if (process.env.NODE_ENV === 'production') {
  const assetsManifest = require('../dist/manifest.json')
  APP_CSS = assetsManifest['/index.css']
  APP_JS = assetsManifest['/index.js']
}

/* GET Home page. */
router.get('/', function (req, res) {
  const name = req.query.name
  if (name) {
    return res.render('index', {
      FACEBOOK_APP_ID,
      APP_URL: `${APP_URL}${req.url}`,
      APP_TITLE: `${name} on ${APP_TITLE}`,
      APP_DESCRIPTION,
      APP_IMAGE,
      APP_CSS,
      APP_JS
    })
  }

  res.render('index', {
    FACEBOOK_APP_ID,
    APP_URL, APP_TITLE,
    APP_DESCRIPTION,
    APP_IMAGE,
    APP_CSS,
    APP_JS
  })
})

router.use('/api', api)

module.exports = router
