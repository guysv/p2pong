var path = require('path')

module.exports = {
  configureWebpack: config => {
    config.resolve.alias = {
      ipfs: 'ipfs/dist/index.min.js',
      '@': path.resolve('src')
    }
  }
}
