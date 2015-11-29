var path = require('path')
var deepExtend = require('deep-extend')
var loadersByExt = require('./build-libs/loaders-by-ext')

var babelLoader='babel?presets[]=react,presets[]=es2015'

module.exports = function(override) {
  override = override || {}
  var special = override._special || {}
  override._special = void 0


  var loadersMap = deepExtend({}, {
    'js': {
      include: [
        path.resolve('./src/js'),
      ],
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    'jsx': {
      include: [
        path.resolve('./src/components'),
      ],
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    'json': {
      loader: 'json-loader'
    },
    'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000',
  }, special.loaders || {})

  // Replace babel loader with our settings
  Object.keys(loadersMap).map(function (loaderKey) {
    var loader = loadersMap[loaderKey]
    var loaderStr = loader.loader || loader
    if(/(?!babel\?)babel/.test(loaderStr)) {
      var str = loaderStr.replace('babel', babelLoader)
      if(loader.loader) 
        loader.loader = str
      else
        loadersMap[loaderKey] = str
    }
  })

  return deepExtend({
    resolve: {
      alias: {
        js: path.resolve('src/js'),
        comp: path.resolve('src/components'),
        img: path.resolve('src/img'),
      },
      extensions: ['', 'webpack.js', 'web.js', '.js', '.jsx']
    },
    entry: './init',
    context: path.resolve('./src/js'),
    output: {
      path: path.resolve('./dist'),
      filename: 'js/bundle.js'
    },
    module: {
      loaders: loadersByExt(loadersMap)
    }
  }, override)
}
