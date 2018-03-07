const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// from UglifyJs TypeError: Cannot read property 'sections' of null
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const utilCommon = require('../util/common')
const baseConfig = require('./base.conf')
const webpackBaseConfig = require('./webpack.base.conf')

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: baseConfig.build.mode,
  module: {
    rules: utilCommon.styleLoaders({
      sourceMap: baseConfig.build.productionSourceMap,
      extract: true
    })
  },
  devtool: baseConfig.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: baseConfig.build.outputRoot,
    filename: utilCommon.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utilCommon.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': baseConfig.build.env
    }),
    // Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: true,
    //     drop_console: true
    //   },
    //   sourceMap: true
    // }),
    // new UglifyJsPlugin(),
    // Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utilCommon.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: baseConfig.build.index,
      template: baseConfig.build.template,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // })
  ]
})

module.exports = webpackProdConfig
