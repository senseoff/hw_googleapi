let map = null,
    geocoder = null,
    from = prompt('Введите откуда вы хотите проложить маршрут:'),
    to = prompt('Введите куда вы хотите проложить маршрут:');

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8
  });
  
  geocoder = new google.maps.Geocoder();
  
  geocoder.geocode({address : from}, (results, status) => {
      if (status == 'OK') {
          from = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
      } else {
        alert('Вы ввели неверный адрес!');
    }
  })

  geocoder.geocode({address : to}, (results, status) => {
      if (status == 'OK') {
          to = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
      }
    }
  })


    
  var directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer();

    var request = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    directionsDisplay.setMap(map);

}