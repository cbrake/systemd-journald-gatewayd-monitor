// example app to get data from a number of systemd-journald-gatewayd instances
// useage: app.js http://<machine 1>:19531/entries?follow http://<machine 2>:19531/entries?follow ...
// this is actually a general purpose app that could be used to stream data
// from any number of URIs

http = require('http')

var setUp = function(uri) {
  var match = /http:\/\/(.*):/.exec(uri)
  var host
  if (match) {
    host = match[1]
  } else {
    console.log('Error parsing: ' + uri)
    return
  }

  http.get(uri, function(res) {
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
      process.stdout.write(host + ':' + chunk)
    })
  }).on('error', function(e) {
    // console.log("Got Error: " + e.message);
  }).on('close', function() {
    //console.log("Connection closed, restarting")
    // the following is used to break recursion
    // and avoid blowing the stack
    setTimeout(setUp, 0, uri)
  })
}

process.argv.forEach(function(val, index, array) {
  if (index >= 2) {
    setUp(val)
  }
})

