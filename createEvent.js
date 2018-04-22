
var pos;
$(document).ready(function () {
  $("#address_button").click(function() {
    getLatLng();
    //console.log($("#Address").val();
    /*console.log(pos == undefined);
    console.log("lat: " + String(pos.position.lat()));
    console.log("long: " + String(pos.position.lng()));
    firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/orgName").once("value").then(function(snapshot) {
      createDonationRequest($("#RequestDetails").val(), pos[lat], pos[long], $("#type_event").val(), snapshot.val());
    });*/
  });

  function getLatLng(){
    var geocoder = new google.maps.Geocoder();
    var address = $("#Address").val();


    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        pos = {
          position: results[0].geometry.location
      ,
        }
        console.log(pos == undefined);

        firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/orgName").once("value").then(function(snapshot) {
          createDonationRequest($("#RequestDetails").val(), pos.position.lat(), pos.position.lng(), $("#type_event").val(), snapshot.val());
        });

      }
    });
  }

  function createDonationRequest(req, lat, lang, type, org) {
    firebase.database().ref('donation_requests/' + req).child("lat").set(lat);
    firebase.database().ref('donation_requests/' + req).child("lang").set(lang);
    firebase.database().ref('donation_requests/' + req).child("type").set(type);
    firebase.database().ref('donation_requests/' + req).child("email").set(firebase.auth().currentUser.email);
    firebase.database().ref('donation_requests/' + req).child("organization").set(org);
  }

});
