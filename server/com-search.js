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
  ensureComs,
  searchBuffer
}


var comsFile = 'coms'
var comsData 
const PAGE_SIZE = 10

///////////////////////////////

// Just so that the deploy server knows we're live :)
app.use('/:regex', function(req, res, next){
  var regStr = req.params.regex
  var page = req.query.page || '0'
  page = +page

  searchComs({str: regStr, page}, function (err, results) {
    if(err)
      return res.status(500).send(err)
    return res.status(200).send(results)
  })
})

function searchComs(opts,done) {
  ensureComs(function (err, coms) {

    if(err) return done(err)

    log('Searching with "' + opts.str + '"')

    var reg = new Re2(opts.str || '$^', 'i')
    var results = coms.filter( c => reg.test(c) ).map(r => r.toString())
    var total = results.length
    var sliced = results.slice(opts.page * PAGE_SIZE, opts.page * PAGE_SIZE + PAGE_SIZE)
    var payload = {
      results: sliced,
      totalResults: total,
      page: opts.page,
      str: opts.str,
      pageSize: PAGE_SIZE
    }
    return done(null, payload)
      
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

function searchBuffer(str, buf) {
  var reg = new Re2(str, 'g')
  return reg.match(buf)
}

function log(msg) {
  console.log('[ Server ]: ' + msg)
}
