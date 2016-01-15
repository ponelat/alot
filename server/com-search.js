var express = require('express')
var path = require('path')
var config = require('../config.js')
var Re2 = require('re2')
var fs = require('fs')
var bufferSplit = require('buffer-split')

var app = express()
module.exports = {
  app,
  searchComs,
  ensureComs
}


var comsFile = 'coms'
var comsData 

///////////////////////////////

// Just so that the deploy server knows we're live :)
app.use('/:regex', function(req, res, next){
  var regStr = req.params.regex
  searchComs(regStr, function (err, results) {
    if(err)
      return res.status(500).send(err)
    return res.status(200).send(results)
  })
})

function searchComs(str,done) {
  ensureComs(function (err, coms) {
    if(err) return done(err)
    log('Searching with "' + str + '"')
    var reg = new Re2(str || '$^', 'i')
    var results = coms.filter( c => reg.test(c) )
    results = results.map(r => r.toString())
    return done(null, results.length > 0 ? results : ['none'])
      
  })
}

function ensureComs(done) {
  if(comsData) {
    return done(null, comsData)
  }
  fs.readFile(comsFile, { encoding: null }, function (err, data ) {
    if(err) return done(err)
    comsData = bufferSplit(data, new Buffer('\n'))
    done(null,comsData)
  })
}

function log(msg) {
  console.log('[ Server ]: ' + msg)
}
