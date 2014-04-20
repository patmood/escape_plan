var fs = require('fs')
  , readline = require('readline') 

var airports = {}
  , origin = 'SFO'
  , dest = 'VPN'

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
  console.log(Object.keys(airports).length, 'airports')
  console.log('Distance between', origin, 'and', dest + ':')
  console.log(calcDist(airports[origin].lat, airports[origin].lon, airports[dest].lat, airports[dest].lon ) + ' kms')
})


function calcDist(lat1, lon1, lat2, lon2){
  // Use Spherical Law of Cosines to calculate distance
  var l1 = parseFloat(lat1) * Math.PI / 180
    , l2 = parseFloat(lat2) * Math.PI / 180
    , delta = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI / 180
    , R = 6371
    , d =  Math.acos( Math.sin(l1)*Math.sin(l2) + Math.cos(l1)*Math.cos(l2) * Math.cos(delta) ) * R 

  return d.toFixed() // kms
}

