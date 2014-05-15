var express = require('express')
var router = express.Router()
  , airports = require('../airports')
  , distance = require('../lib/distance')
  , rome2rio = require('../lib/rome2rio')

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
      , origin = startPlace.canonicalName
      , destLat = startPlace.lat * -1
      , destLon = startPlace.lng * -1
      , destination = destLat.toString() + ',' + destLon.toString()
      // , destination = '-49.037868,-7.031250' // Middle of ocean

    // Find routes for furthest location
    rome2rio.routes(origin, destination, 'Pos', function(err, trip){
      if (err) throw err
      if (trip.routes.length > 0) {
        console.log('Found furthest LOCATION')
        res.send(trip.routes)
      } else {
        // If no routes found, look for routes to furthest airport
        distance.furthestAirport(airports, startPlace, function(furthest) {
          destination = furthest.lat.toString() + ',' + furthest.lon.toString()
          rome2rio.routes(origin, destination, 'Pos', function(err, trip) {
            if (err) throw err
            if (trip.routes.length > 0) {
              console.log('Found furthest AIRPORT', destination)
              res.send(trip.routes)
            } else {
              destination = encodeURIComponent(furthest.country)
              rome2rio.routes(origin, destination, 'Name', function(err, trip) {
                if (err) throw err
                console.log('Found furthest COUNTRY', furthest.country)
                res.send(trip.routes)
              })
            }
          })

        })
      }
    })
  })


})

router.get('/autocomplete', function(req, res) {
  var term = encodeURIComponent(req.query.term)
  rome2rio.autocomplete(term, function(err, suggestions) {
    var list = []
    if (err) console.error(err)

    suggestions.places.forEach(function(place) {
      list.push(place.longName)
    })

    res.send(list)
  })
})

module.exports = router
