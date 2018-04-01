const Rollbar = require('rollbar')
module.exports = new Rollbar(process.env.ROLLBAR_SERVER_TOKEN)