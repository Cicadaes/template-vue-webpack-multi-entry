const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./base.conf')
const webpackBaseConfig = require('./webpack.base.conf')
const utilCommon = require('../util/common')

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
  webpackBaseConfig.entry[name] = ['./build/script/dev-hot-client'].concat(webpackBaseConfig.entry[name])
})

module.exports = merge(webpackBaseConfig, {
  mode: baseConfig.dev.mode,
  module: {
    rules: utilCommon.styleLoaders({ sourceMap: baseConfig.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': baseConfig.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: baseConfig.dev.template,
      inject: true
    })
  ]
})
