const { resolve } = require('path')
const { readFileSync } = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const license = readFileSync('./LICENSE')

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
  devtool: 'cheap-module-source-map',
  module : {
    rules: [
      {
        test   : /\.jsx?$/,
        use    : ['babel-loader'],
        exclude: [/node_modules/]
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
        NODE_ENV         : JSON.stringify('production'),
        API_URL          : JSON.stringify('/api'),
        APP_TITLE        : JSON.stringify(process.env.APP_TITLE),
        APP_DESCRIPTION  : JSON.stringify(process.env.APP_DESCRIPTION),
        APP_IMAGE        : JSON.stringify(process.env.APP_IMAGE),
        FACEBOOK_APP_ID  : JSON.stringify(process.env.FACEBOOK_APP_ID),
        OPBEAT_ORG_ID    : JSON.stringify(process.env.OPBEAT_ORG_ID),
        OPBEAT_WEB_APP_ID: JSON.stringify(process.env.OPBEAT_WEB_APP_ID)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug   : false
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings     : false,
        collapse_vars: true,
        reduce_vars  : true
      },
      comments: false
    }),

    new ExtractTextPlugin('index.css'),

    new webpack.BannerPlugin({ banner: license.toString() })
    // Add license to all css,js files
  ]
}
