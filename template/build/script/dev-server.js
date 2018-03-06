const path = require('path')
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const detect = require('detect-port')
const chalk = require('chalk')

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
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    _hotMiddleware.publish({ action: 'reload' })
    cb()
  })
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
      const uri = 'http://localhost:' + port

      console.log(chalk.green('> Starting dev server...'))
      _devMiddleware.waitUntilValid(() => {
        console.log(chalk.green('> Listening at ' + uri + '\n'))
      })

      app.listen(port)
    } else {
      console.log(`port: ${port} was occupied, try port: ${_port}`)
    }
  })
  .catch(err => {
    console.log(err)
  })
