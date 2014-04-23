var express = require('express')
var router = express.Router()
  , airports = require('../airports')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Escape Plan' })
})

router.post('/origin', function(req, res) {
  res.send(airports[req.body.origin])
})

module.exports = router
