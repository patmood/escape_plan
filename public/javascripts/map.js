function initialize() {
  var mapOptions = {
    zoom: 4
  , center: new google.maps.LatLng(-34.397, 150.644)
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

  var marker = new google.maps.Marker({
    map: map
  , position: map.getCenter()
  , title: 'Click to zoom'
  })

  google.maps.event.addListener(map, 'center_changed', function() {
    // pan to marker 3 secs after moving
    window.setTimeout(function() {
      map.panTo(marker.getPosition())
    }, 3000)
  })

  google.maps.event.addListener(marker, 'click', function() {
    // zoom and center map to marker on click
    map.setZoom(8)
    map.setCenter(marker.getPosition())
  })


// Tip: If you're trying to detect a change in the viewport, be sure to use the specific bounds_changed event rather than constituent zoom_changed and center_changed events. Because the Maps API fires these latter events independently, getBounds() may not report useful results until after the viewport has authoritatively changed. If you wish to getBounds() after such an event, be sure to listen to the bounds_changed event instead.



}

// Load the google maps library asynchronously
function loadScript() {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDHfIQxyJ8SepL4OzLiY_SUuleXnsG5osk&sensor=false&callback=initialize'
  document.body.appendChild(script)
}

window.onload = loadScript
