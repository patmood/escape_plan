var http = require('http')
  , https = require('https')
  , apiKey = require('../keys').rome2rio // process.env.ROME2RIO


module.exports = function(origin, dest, next) {

  console.log('PARAMS:', origin, dest)

  var options = {
    host: 'free.rome2rio.com'
  , path: '/api/1.2/json/Search?key=' + apiKey + '&oName=' + origin + '&dPos=' + dest
  }

  var prot = options.port == 443
             ? https
             : http

  var req = http.get(options, function(res) {
    var output = ''
      , obj = {}
    console.log('STATUS:', res.statusCode)
    res.setEncoding('utf8')

    res.on('data', function(chunk) {
      output += chunk
    })

    res.on('end', function() {
      if (res.statusCode == 200) {
        obj = JSON.parse(output)
        return next(null, obj)
      } else {
        return next(statusCode)
      }

    })
  })

  req.end()
}
