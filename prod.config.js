const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry  : [
    'es6-promise/auto',
    // a polyfill of the ES6 Promise

    'whatwg-fetch',
    // window.fetch JavaScript polyfill for all browsers

    resolve(__dirname, 'client')
    // main index.js file of web client
  ],
  output : {
    filename  : 'index.js',
    path      : resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'nosources-source-map',
  module : {
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL : JSON.stringify('/api')
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug   : false
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: true,
      compress: {
        collapse_vars: true,
        reduce_vars  : true
      },
      comments: false
    }),

    new HtmlWebpackPlugin({
      template: 'views/index.pug'
    }),

    new ExtractTextPlugin('index.css')
  ]
}
