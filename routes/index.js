var express = require('express')
var router = express.Router()
  , airports = require('../airports')
  , distance = require('../lib/distance')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Escape Plan' })
})

router.post('/origin', function(req, res) {
  distance(airports, req.body.origin.toUpperCase(), function(distArr) {
    res.send(distArr)
  })
})

module.exports = router


// allDist(origin, function(x){
//   console.log(x)
// })
