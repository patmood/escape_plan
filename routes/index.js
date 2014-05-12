var express = require('express')
var router = express.Router()
  , airports = require('../airports')
  , distance = require('../lib/distance')
  , getTrip = require('../lib/rome2rio')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Escape Plan' })
})

router.get('/origin', function(req, res) {
  console.log(req.query)
  var origin = req.query.origin.toUpperCase()
    , destLat = airports[origin].lat * -1
    , destLon = airports[origin].lon * -1
    // , destPos = '-49.037868,-7.031250' // Middle of ocean
    , destPos = destLat.toString() + ',' + destLon.toString()

  console.log(destPos)

  getTrip(origin, destPos, function(err, trip){
    if (err) throw err
    if (trip.routes.length > 0) {
      console.log('SENDING furthest location')
      res.send(trip)
    } else {
      distance.furthestAirport(airports, origin, function(furthest) {
        destPos = furthest.lat.toString() + ',' + furthest.lon.toString()
        getTrip(origin, destPos, function(err, trip) {
          if (err) throw err
          console.log('SENDING furthest airport')
          res.send(trip)
        })

      })
    }
  })

})

// router.get('/price', function(req, res) {
//   console.log(req.query)
//   getTrip(req.query.origin, req.query.dest, function(err, trip) {
//     if (err) throw err
//     res.send(trip)
//   })
// })

module.exports = router
