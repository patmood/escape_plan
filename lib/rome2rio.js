var http = require('http')
  , https = require('https')
  , apiKey

if (process.env.NODE_ENV === 'production') {
  apiKey = process.env.ROME2RIO
} else {
  apiKey = require('../keys').rome2rio
}


module.exports.routes = function(origin, dest, destType, next) {

  console.log('PARAMS:', origin, dest, destType)

  var options = {
    host: 'free.rome2rio.com'
  , path: '/api/1.2/json/Search?key=' + apiKey + '&oName=' + origin + '&d' + destType + '=' + dest
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
        console.log(obj)
        return next(null, obj)
      } else {
        return next(res.statusCode)
      }
    })

    res.on('error', function(err) {
      console.log('rome2rio api error')
      console.log(err)
    })
  })

  req.end()
}

module.exports.autocomplete = function(term, next) {
  var options = {
    host: 'free.rome2rio.com'
  , path: '/api/1.2/json/Autocomplete?key=' + apiKey + '&query=' + term
  }

  var prot = options.port == 443
             ? https
             : http

  var req = http.get(options, function(res) {
    var output = ''
      , obj = []
      , suggestions
    res.setEncoding('utf8')

    res.on('data', function(chunk) {
      output += chunk
    })

    res.on('end', function() {
      if (res.statusCode == 200) {
        obj = JSON.parse(output)
        return next(null, obj)
      } else {
        return next(res.statusCode)
      }

    })
  })

  req.end()
}

