const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const DEV_SERVER_PORT = 3000

module.exports = {
  entry    : [
    'react-hot-loader/patch',
    // activate HMR for React

    `webpack-dev-server/client?http://localhost:${DEV_SERVER_PORT}`,
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    resolve(__dirname, 'client')
    // index.js
  ],
  output   : {
    filename  : 'index.js',
    path      : resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // context: resolve(__dirname, 'client'),
  devtool  : 'inline-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    port: DEV_SERVER_PORT,
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
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new HtmlWebpackPlugin({
      template: 'views/index.pug'
    })
  ]
}
