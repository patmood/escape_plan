var allDists = function(airports, origin, next) {
  var distArr = []
    , distObj = {
        'summary': {}
      , 'distances': {}
    }
    , dist

  // Calculate all distances
  for (var dest in airports) {
    dist = calcDist(airports[origin], airports[dest])
    distArr.push([dest, dist])
  }

  // Sort by distance
  distArr.sort(function(a,b) {
    return (parseInt(a[1]) > parseInt(b[1]))
    ? -1
    : 1
  })

  distObj.summary['numOptions'] = distArr.length
  distObj.summary['closest'] = distArr[distArr.length - 2]
  distObj.summary['furthest'] = distArr[0]

  for (var i = 0; i < distArr.length; ++i) distObj.distances[i] = distArr[i]

  return next(distObj)
}

var calcDist = function(origin, dest){
  // Use Spherical Law of Cosines to calculate distance

  var lat1 = parseFloat(origin.lat)
    , lon1 = parseFloat(origin.lon)
    , lat2 = parseFloat(dest.lat)
    , lon2 = parseFloat(dest.lon)
    , l1 = lat1 * Math.PI / 180
    , l2 = lat2 * Math.PI / 180
    , delta = (lon2 - lon1) * Math.PI / 180
    , R = 6371
    , d =  Math.acos( Math.sin(l1)*Math.sin(l2) + Math.cos(l1)*Math.cos(l2) * Math.cos(delta) ) * R

  return d.toFixed() // kms
}

module.exports = allDists
