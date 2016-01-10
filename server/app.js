var express = require('express')
var path = require('path')
var config = require('../config.js')
var ejs = require('ejs')
var pkg = require('../package.json')

var server
var app

/**
 * Exports for Testing
 */
module.exports = {
  app: app,
  server: server,
  start: start,
  stop: stop,
  setup: setup
}

///////////////////////////////

function setup() {
  app = express()

  /**
   * Middleware
   */
  app.engine('html', require('ejs').renderFile)
  app.set('views', path.join(__dirname, './views'))

  // Just so that the deploy server knows we're live :)
  app.use('/_health', function(req, res, next){
    res.status(200).send('I am alive')
  })

  ////////
  // Static
  app.use(express.static(path.resolve(__dirname, '../dist')))

  app.use('/com', require('./com-search'))

  ////////
  // SPA
  app.use(function (req, res) {
    res.render('index.html', {pkg})
  })

  return app
}

function start(done) {
  setup()
  server = app.listen(config.PORT, function () {
    log('node.js server running at http://' + server.address().address + ':' + server.address().port)
  })
  server.once('listening', (done || function() {}))
}

function stop(done) {
  if(!server && typeof done === 'function') { // nothing to stop
    return done()
  }

  server.close(done || function() {})
}

function log(msg) {
  console.log('[ Server ]: ' + msg)
}
