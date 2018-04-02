const Rollbar = require('rollbar')

module.exports = new Rollbar({
  accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
})
