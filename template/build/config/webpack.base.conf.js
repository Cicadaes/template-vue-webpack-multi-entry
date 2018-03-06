const baseConfig = require('./base.conf')
const vueLoaderConfig = require('./base.vue-loader.conf')
const packConfig = require('./base.pack.conf')
const utilCommon = require('../util/common')

module.exports = {
  entry: baseConfig.entrys,
  output: {
    path: baseConfig.build.outputRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? baseConfig.build.assetsPublicPath
      : baseConfig.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: packConfig.eslintPath,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: packConfig.babelCompilePath
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 5000,
              name: utilCommon.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false
              }
            }

          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utilCommon.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utilCommon.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
