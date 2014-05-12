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
      // $('.trip-planning').append(
      //   'Closest travel: ' + data.summary.closest[0] + ', ' + data.summary.closest[1] + ' kms<br>'
      // + 'Furthest travel: ' + data.summary.furthest[0] + ', ' + data.summary.furthest[1] + ' kms<br>'
      // )
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
