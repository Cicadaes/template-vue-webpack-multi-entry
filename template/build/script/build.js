const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')

const baseConfig = require('../config/base.conf')
const webpackProdConfig = require('../config/webpack.prod.conf')

const spinner = ora('Building for production...')
spinner.start()

rm(path.join(baseConfig.build.outputRoot, baseConfig.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackProdConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err

      process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
