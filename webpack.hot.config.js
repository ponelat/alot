var path = require('path')
var deepExtend = require('deep-extend')
var makeConfig = require('./make-webpack.config.js')
var config = require('./config')

module.exports = makeConfig({
  _special: {
    loaders: {
      'jsx': {
        loader: "react-hot-loader!babel"
      }
    }
  },
  devtool: "eval",
  output: {
    pathinfo: true,
    debug: true,
    chunkFilename: "[id].js"
  },
  devServer: {
    port: 3200,
    publicPath: "/" ,
    noInfo: true,
    colors: true,
    proxy: {
      '*': 'http://localhost:' + config.PORT
    },
    stats: {
      colors: true
    },
  },
})

      
