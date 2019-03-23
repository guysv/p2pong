module.exports = {
  publicPath: './',
  configureWebpack: config => {
    config.resolve.alias.ipfs = 'ipfs/dist/index.min.js'
  }
}
