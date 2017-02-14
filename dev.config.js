const path = require('path')

module.exports = {
  entry  : path.resolve(__dirname, 'client'),
  output : {
    filename: 'index.js',
    path    : path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-module-source-map'
}
