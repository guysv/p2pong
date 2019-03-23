var path = require('path')

module.exports = {
  publicPath: './',
  configureWebpack: config => {
    config.resolve.alias = {
      ipfs: 'ipfs/dist/index.min.js',
      '@': path.resolve('src')
    }
  }
}
