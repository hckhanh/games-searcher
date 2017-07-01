const express = require('express')
const path = require('path')
const compression = require('compression')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const opbeat = require('opbeat')

const APP_URL = process.env.APP_URL

// If an incoming request uses a protocol other than HTTPS,
// redirect that request to the same url but with HTTPS
const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      )
    }
    next()
  }
}

const index = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Force the connection need to run on SSL
if (process.env.NODE_ENV === 'production') {
  app.use(forceSSL())
}

app.use(compression())
app.use(favicon(path.resolve(__dirname, 'client', 'styles', 'images', 'logo-icon.png')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// for public compiled libraries
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', APP_URL)
  next()
})

app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
//noinspection JSUnusedLocalSymbols
app.use(function(err, req, res, next) {
  const env = req.app.get('env')

  // send error to Opbeat
  if (err.status !== 404 && env === 'production') {
    opbeat.captureError(err)
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = env === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
