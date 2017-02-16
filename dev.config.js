const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry    : resolve(__dirname, 'client'),
  output   : {
    filename  : 'index.js',
    path      : resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // context: resolve(__dirname, 'client'),
  devtool  : 'inline-source-map',
  devServer: {
    // hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    port: 3000,
    // port for dev server

    historyApiFallback: true
    // instead of return 404, return index.html
  },
  module   : {
    rules: [
      {
        test   : /\.jsx?$/,
        use    : ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.pug$/,
        use : ['pug-loader']
      }
    ]
  },
  plugins  : [
    new HtmlWebpackPlugin({
      template: 'views/index.pug'
    })
  ]
}
