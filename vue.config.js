var webpack = require('webpack')
/* eslint camelcase: 0 */
var child_process = require('child_process')

var appVersion = require('./package.json').version

var gitRev = child_process.execSync(`git -C "${__dirname}" rev-parse HEAD`).toString()
var gitClean = child_process.execSync(`git -C "${__dirname}" status --porcelain`).toString() === ''

module.exports = {
  publicPath: './',
  configureWebpack: config => {
    config.resolve.alias.ipfs = 'ipfs/dist/index.min.js'
    config.plugins.push(new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(appVersion),
      APP_GIT_REV: JSON.stringify(gitRev),
      APP_GIT_CLEAN: JSON.stringify(gitClean)
    }))
  }
}
