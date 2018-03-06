const utilCommon = require('../util/common')
const baseConfig = require('../config/base.conf')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utilCommon.cssLoaders({
    sourceMap: isProduction
      ? baseConfig.build.productionSourceMap
      : baseConfig.dev.cssSourceMap,
    extract: isProduction
  })
}
