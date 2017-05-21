const { resolve } = require('path')
const { readFileSync } = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')

const license = readFileSync('./LICENSE')

module.exports = {
  entry: {
    index: resolve(__dirname, 'client'), // main index.js file of web client
    vendor: [
      'react',
      'react-dom'
      // React core libraries
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(svg|png|jpe?g)$/,
        use: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'promise-polyfill'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify('/api'),
        APP_TITLE: JSON.stringify(process.env.APP_TITLE)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true,
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),

    new OptimizeCssAssetsPlugin(),

    new ExtractTextPlugin({ filename: 'index.[chunkhash].css', allChunks: true }),

    new ManifestPlugin({ basePath: '/' }),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),

    new webpack.BannerPlugin({ banner: license.toString() })
    // Add license to all css,js files
  ]
}
