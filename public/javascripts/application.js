var tripData

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
  , beforeSend: function() {
      $('#origin-submit').prop('disabled', true)
      $('.spinner').show()
    }
  , success: function(data) {
      $('#origin-submit').prop('disabled', false)
      $('.spinner').hide()

      tripData = data[0]
      console.log('Trip Data:', tripData)
      _.last(tripData.stops, function(lastStop) {
        addSegment({
          kind: 'intro'
        , destination: lastStop.name
        })
      })
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
