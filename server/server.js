var path = require('path')
var ejs = require('ejs')
var express = require('express')
var app = express()
var request = require('request')

module.exports = {
  start: start,
  stop: stop
}

var config = {
  PORT: 3000,
}

app.set('views', path.join(__dirname, './views'))
app.engine('html', require('ejs').renderFile)

app.use(express.static('./dist'))

app.get('/waldoify/*', fetch_website, function(req,res,next) {
  if(res.rawhtml) {
    res.type('html')
    res.send(res.rawhtml)
    res.end()
    return
  } else {
    res.render('notfound.html', {url: req.params[0]})
  }

  // res.render('index.html', {waldo_link: 'google.com'})
})

////////
// SPA
app.use( function ( req, res ) {
  res.render('index.html')
})

/////////////////////////////

function start(done) {
  server = app.listen(config.PORT, function () {
      console.log('node.js server running at http://' + server.address().address + ':' + server.address().port)
  })
  server.once('listening', (done || function() {}))
}

function stop(done) {
  if(!server && typeof done === 'function') { // nothing to stop
    return done()
  }
  server.close(done || function() {})
}

function fetch_website(req,res,next) {
  var url = req.params[0]
  console.log('url', url)
  request(url, function(err, response, body) {
    if(err) { 
      res.rawhtml = null
      return next()
    }
    if(response.statusCode != 200) {
      res.rawhtml = null
      return next()
    }

    var $ = cheerio.load(body)
    $('style').each(function (el) {
      this.attr('src')
    })

    res.rawhtml = $(body).
    next()
  })
}

