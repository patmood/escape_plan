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
  distance(airports, origin, function(dists) {
    res.send(dists)
  })
})

router.get('/price', function(req, res) {
  console.log(req.query)
  getTrip(req.query.origin, req.query.dest, function(err, trip) {
    if (err) throw err
    res.send(trip)
  })
})

module.exports = router
