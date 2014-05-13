$('#origin-input').autocomplete({
  source: '/autocomplete'
, minLength: 3
, autoFocus: true
})

$('#origin-form').on('submit', function(e){
	e.preventDefault()
  reset()
	$.ajax({
    dataType: 'json'
  , url: '/origin'
  , data: {
      origin: $('#origin-form input').val()
    }
  , success: function(data) {
      console.log('success')
      console.log(data)
      // $('.raw-data').append(
      //   '<pre>' + JSON.stringify(data, undefined, 2) + '</pre>'
      // )
      data[0].segments.forEach(function(segment) {
        console.log('SEGEMENT:', segment)
        addSegment(segment)
      })
    }
  , error: function(err) {
      console.error(err)
    }
	})
})

function addSegment(details) {
  if (details.kind === 'flight') {
    var title = '<h2>' + capitalize(details.kind) + ' from ' + details.sCode + ' to ' + details.tCode + '</h2>'
  } else {
    var title = '<h2>' + capitalize(details.kind) + ' from ' + details.sName + ' to ' + details.tName + '</h2>'
  }
  $('.itinerary').append(
    title
    + '<p>Price: ' + details.indicativePrice.price
    + '<br>Distance: ' + details.distance + 'kms'
    + '<br>Duration: ' + details.duration + ' minutes'
    + '</p>'
  )
}

function reset() {
  $('.itinerary').empty()
  $('.raw-data').empty()
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}
