var fs = require('fs')
  , readline = require('readline')

var airports = {}
  , origin
  , dest
  // , test = require('./test.json')

var rd = readline.createInterface({
  input: fs.createReadStream(__dirname + '/airports.csv')
, output: process.stout
, terminal: false
})

rd.on('line', function(line){
  var data = line.replace(/"/g,'').split(',')
    , code = data[4]
  if(code != '/N'){
    airports[code] = {
      name: data[1]
    , city: data[2]
    , country: data[3]
    , lat: data[6]
    , lon: data[7]
    }
  }
})

rd.on('close', function(){
  origin = airports['SFO']
  dest = airports['VPN']
  console.log(Object.keys(airports).length, 'airports')
  console.log('Distance between', origin.name, 'and', dest.name + ':')
  console.log(calcDist(origin, dest) + ' kms')

  fs.writeFile('test.json', JSON.stringify(airports, null, 2), function(err) {
    if (err) throw err
    console.log('Saved!!!')
  })
  // allDist(origin, function(x){
  //   console.log(x)
  // })
})


function calcDist(origin, dest){
  // Use Spherical Law of Cosines to calculate distance

  var lat1 = origin.lat
    , lon1 = origin.lon
    , lat2 = dest.lat
    , lon2 = dest.lon
    , l1 = parseFloat(lat1) * Math.PI / 180
    , l2 = parseFloat(lat2) * Math.PI / 180
    , delta = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI / 180
    , R = 6371
    , d =  Math.acos( Math.sin(l1)*Math.sin(l2) + Math.cos(l1)*Math.cos(l2) * Math.cos(delta) ) * R

  return d.toFixed() // kms
}

function allDist(origin, next) {
  var dists = []
    , dist
  for (var dest in airports) {
    dist = calcDist(origin, airports[dest])
    dists.push([dest, dist])
  }

  dists = dists.sort(function(a,b) {
    return a[1] > b[1]
  })

  return next(dists)
}
