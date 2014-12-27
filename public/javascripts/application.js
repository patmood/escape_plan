var tripData

$('#origin-input').autocomplete({
  source: '/autocomplete'
, minLength: 3
, autoFocus: true
, select: function() {
    $('#origin-form').submit()
  }
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
  , beforeSend: function() {
      $('#origin-submit').prop('disabled', true)
      $('.spinner').show()
    }
  , success: function(data) {
      $('#origin-submit').prop('disabled', false)
      $('.spinner').hide()
      console.log('Data:', data)
      tripData = data[0]

      if (!data.length > 0) return addSegment({kind: 'error'});
        var numStops = tripData.stops.length
          , lastStop = tripData.stops[numStops - 1]

      if (lastStop.name === "Destination") {
        lastStop.name = lastStop.pos + " (near " + tripData.stops[numStops - 2].name + ")"
      }

      // Add intro summary
      addSegment({
        kind: 'intro'
      , destination: lastStop.name
      , distance: tripData.distance.toFixed(1)
      , duration: (tripData.duration / 60.0).toFixed(1)
      })

      // Add each stop
      tripData.segments.forEach(addSegment)
    }
  , error: function(err) {
      $('#origin-submit').prop('disabled', false)
      $('.spinner').hide()
      console.error(err)
    }
	})
})

function addSegment(details) {
  $('.itinerary').append(
    _.template( $('#tpl-' + details.kind).html(), details)
  )
}

function reset() {
  $('.itinerary').empty()
  $('.raw-data').empty()
}
