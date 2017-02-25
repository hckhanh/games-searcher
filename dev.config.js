const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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

    'es6-promise/auto',
    // a polyfill of the ES6 Promise

    'whatwg-fetch',
    // window.fetch JavaScript polyfill for all browsers

    resolve(__dirname, 'client')
    // main index.js file of web client
  ],
  output   : {
    filename  : 'index.js',
    path      : resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool  : 'inline-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    // contentBase: [resolve(__dirname, 'public')],
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
      },
      {
        test: /\.(sass|s?css)$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(svg|png|jpe?g)/,
        use : 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins  : [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.DefinePlugin({
      API_URL: JSON.stringify('//localhost:4000/api')
    }),

    new HtmlWebpackPlugin({
      template: 'views/index.pug'
    }),

    new ExtractTextPlugin('index.css')
  ]
}
