var express = require('express')
var path = require('path')
var config = require('../config.js')

var app = express()
module.exports = app

var coms = [ 'abc', 'abra', 'aabb']

///////////////////////////////

// Just so that the deploy server knows we're live :)
app.use('/:regex', function(req, res, next){
  var regStr = req.params.regex
  res.status(200).send(searchComs(regStr))
})

function searchComs(str) {
  log('Searching with "' + str + '"')
  var results = []
  if(str) {
    var reg = new RegExp(str || '$^')
    results = coms.filter(com => reg.test(com))
  }
  return results.length > 0 ? results : ['none']
}

function log(msg) {
  console.log('[ Server ]: ' + msg)
}
