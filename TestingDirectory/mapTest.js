// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.



var map, infoWindow;
var service;
var snapshotLong;
var snapshotLat;

async function getData() {
  var database = firebase.database().ref("donation_requests");
  await database.once("value").then(function(snapshot) {
    if(snapshot != null) {
      snapshotLong = -122.04;
      snapshotLat = 37.37;
    }
  });
}
getData();

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(pos.lat);
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      var request = {
        location: pos,
        radius: '1000',
        keyword: ['foundation']
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
function createMarker(place) {

  var img = {
    url: "https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/user_photos/000/488/565/datas/profile.jpg",
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(10, 16)
  };
  let marker = new google.maps.Marker({
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      url: "details.html",
      //icon: img,
      name: place.name,
      map: map
  });

    google.maps.event.addListener(marker, 'click', function() {


        push_lat_long(firebase.auth().currentUser.uid, marker.getPosition().lat(), marker.getPosition().lng(), marker.name);


        alert(marker.name);




    });
}
