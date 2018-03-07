const path = require('path')

const moduleName = process.env.MODULE_NAME || 'app'
const modulePath = process.env.MODULE_PATH || 'entry/app'
const moduleConfig = require('../entry/' + moduleName + '.conf')
const htmlTemplatePath = 'src/index.tpl.html'

const DateVersion = new Date();

const version = typeof process.env.APP_VERSION == 'undefined' ? (DateVersion.getMonth()+1)+""+DateVersion.getDate() : process.env.APP_VERSION
const splitModule = modulePath.split("\/");
const moduleTargetName = splitModule[splitModule.length-1]+version

function assembleAssetRoot (env, mod) {
  if (process.env.NODE_ENV === 'production') {
    return path.join(__dirname, '../../dests/', env, mod)
  }
  return '/dest/' + env + mod
}

function assembleIndexPath(env, mod, targetName){
  return path.resolve(__dirname, '../../dests/',env,mod,targetName+'.html')
}


module.exports = {
  entrys: {
    app: './src/' + modulePath + '/entry.js'
  },
  build: {
    mode: 'production',
    env: {
      NODE_ENV: '"production"'
    },
    index: assembleIndexPath("prod", moduleName, moduleTargetName),
    template: htmlTemplatePath,
    outputRoot: assembleAssetRoot('prod', moduleName),
    assetsPublicPath: moduleConfig.prod.assetsPath,
    assetsSubDirectory: moduleTargetName,
    productionSourceMap: true
  },
  dev: {
    mode: 'development',
    env: {
      NODE_ENV: '"development"'
    },
    port: 8082,
    template: htmlTemplatePath,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    cssSourceMap: false
  }
}
