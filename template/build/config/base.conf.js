const moduleName = process.env.MODULE_NAME || 'app'
const modulePath = process.env.MODULE_PATH || 'entry/app'
const moduleConfig = require('../entry/' + moduleName + '.conf')
const htmlTemplatePath = 'src/index.tpl.html'

function assembleAssetRoot (env, mod) {
//   return path.join(__dirname, '../../dests/', env, mod)
  return '/dest/' + env + mod
}

module.exports = {
  entrys: {
    app: './src/' + modulePath + '/entry.js'
  },
  build: {
    outputRoot: assembleAssetRoot('prod', moduleName),
    assetsPublicPath: moduleConfig.prod.assetsPath,
    productionSourceMap: true
  },
  dev: {
    mode: 'development',
    env: {
      NODE_ENV: '"development"'
    },
    port: 8080,
    template: htmlTemplatePath,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    cssSourceMap: false
  }
}
