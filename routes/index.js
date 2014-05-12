var express = require('express')
var router = express.Router()
  , airports = require('../airports')
  , distance = require('../lib/distance')
  , rome2rio = require('../lib/rome2rio')
  , apiKey = require('../keys').rome2rio // process.env.ROME2RIO

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Escape Plan' })
})

router.get('/origin', function(req, res) {
  console.log(req.query)
  var origin = encodeURIComponent(req.query.origin)

  // Get the starting place
  rome2rio.autocomplete(origin, function(err, suggestions){
    if (err) return res.send('This error occured:' + err)

    // No starting place found? Booooo
    if (suggestions.places.length == 0) {
      return res.send('Origin counld not be found')
    }

    var startPlace = suggestions.places[0]
      , destLat = startPlace.lat * -1
      , destLon = startPlace.lng * -1
      , destPos = destLat.toString() + ',' + destLon.toString()
      // , destPos = '-49.037868,-7.031250' // Middle of ocean

    // Find routes for furthest location
    rome2rio.routes(startPlace.canonicalName, destPos, function(err, trip){
      if (err) throw err
      if (trip.routes.length > 0) {
        console.log('SENDING furthest location')
        res.send(trip.routes)
      } else {
        // If no routes found, look for routes to furthest airport
        distance.furthestAirport(airports, startPlace, function(furthest) {
          destPos = furthest.lat.toString() + ',' + furthest.lon.toString()
          rome2rio.routes(startPlace.canonicalName, destPos, function(err, trip) {
            if (err) throw err
            console.log('SENDING furthest airport')
            res.send(trip.routes)
          })

        })
      }
    })
  })


})

router.get('/autocomplete', function(req, res) {
  rome2rio.autocomplete(req.query.term, function(err, suggestions) {
    if (err) console.error(err)

    var list = []
    suggestions.places.forEach(function(place) {
      list.push(place.longName)
    })

    res.send(list)
  })
})

module.exports = router
