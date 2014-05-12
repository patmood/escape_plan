$('#origin-input').autocomplete({
  source: '/autocomplete'
, minLength: 3
, autoFocus: true
})

$('#origin-form').on('submit', function(e){
	e.preventDefault()
	$.ajax({
    dataType: 'json'
  , url: '/origin'
  , data: {
      origin: $('#origin-form input').val()
    }
  , success: function(data) {
      console.log('success')
      console.log(data)
      $('.trip-planning').append(
        '<pre>' + JSON.stringify(data, undefined, 2) + '</pre>'
      )
      // initPrices(data)
    }
  , error: function(err) {
      console.error(err)
    }
	})
})

function initPrices(data) {
  $.ajax({
    dataType: 'json'
  , url: '/price'
  , data: {
      origin: data.summary.closest[0]
    , dest: data.summary.furthest[0]
    }
  , success: function(trips) {
      console.log(trips)
    }
  , error: function(err) {
      console.error(err)
    }
  })
}
