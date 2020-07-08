const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // mock server
    proxy: 'http://localhost:3000'
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
