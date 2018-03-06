const path = require('path')
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const detect = require('detect-port')

const baseConfig = require('../config/base.conf')
const webpackDevConfig = require('../config/webpack.dev.conf')
const compiler = webpack(webpackDevConfig)
const _devMiddleware = devMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  quiet: true
})
const _hotMiddleware = hotMiddleware(compiler, {
  log: () => { },
  heartbeat: 2000
})
// default port where dev server listens for incoming traffic
var port = process.env.PORT || baseConfig.dev.port

// dev server by express+webpack
const app = express()
// serve webpack bundle output
app.use(_devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
app.use(_hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(baseConfig.dev.assetsPublicPath, baseConfig.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// use as a promise
detect(port)
  .then(_port => {
    if (port === _port) {
      // console.log(`port: ${port} was not occupied`);
      app.listen(_port)
    } else {
      console.log(`port: ${port} was occupied, try port: ${_port}`)
    }
  })
  .catch(err => {
    console.log(err)
  })
