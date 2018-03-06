const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

module.exports = {
  babelCompilePath: [
    resolve('src')
  ],
  eslintPath: [
    resolve('src')
  ]
}
