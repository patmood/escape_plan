var express = require('express')
var router = express.Router()
  , airports = require('../airports')
  , distance = require('../lib/distance')
  , getTrip = require('../lib/rome2rio')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Escape Plan' })
})

 // **Deprecated
// router.post('/origin', function(req, res) {
//   var origin = req.body.origin.toUpperCase()
//   distance(airports, origin, function(dists) {
//     var dest = dists.summary.furthest[0]
//     getTrip(origin, dest, function(status, trip) {
//       console.log(status)
//       console.log(trip)
//       var details = (status === 200 && trip.routes.length > 0)
//         ? 'You\'re going to '
//         + airports[dest].city
//         + ', '
//         + airports[dest].country
//         + ' and it\'s going to cost you about $'
//         + trip.routes[0].indicativePrice.price
//         : 'Error'
//       res.send(details)
//     })
//   })
// })

router.get('/origin', function(req, res) {
  console.log(req.query)
  var origin = req.query.origin.toUpperCase()
  distance(airports, origin, function(dists) {
    res.send(dists)
  })
})


module.exports = router
