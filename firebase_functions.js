function login() {
  var email = document.getElementById("InputEmail1").value;
  var password = document.getElementById("InputPassword1").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#logout_button").css("display", "block");
    $("#login_button").css("display", "none");
    $("#signup_button").css("display", "none");
    donate("random3");
    createDonationRequest("yoo", 2, 2, "random", "nanoseed");
    test_donation_history_dict = {"troll": 5, "breh": 3, "yo": 2};
    test_possible_events = [{"unb":"r"}, {"type": "troll"}, {"type": "troll"}, {"type": "troll"}, {"type": "troll"}, {"type": "troll"}, {"type": "troll"}, {"type": "breh"}, {"type": "eee"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}, {"type": "breh"}];
    console.log(getRecommendations(test_donation_history_dict, test_possible_events));
    alert("here");
    add_listeners();
  } else {
    $("#logout_button").css("display", "none");
    $("#login_button").css("display", "block");
    $("#signup_button").css("display", "block");
    add_listeners();
  }
});

function sign_out() {
  firebase.auth().signOut()
  alert("signed out")
  // add_listeners();
}

function sign_up() {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function add_listeners() {
  document.getElementById("login_button").onclick = function() {
    login();
  }
  document.getElementById("logout_button").onclick = function() {
    sign_out();
  }
}

window.onload = function() {
  // if(firebase.auth().currentUser != null){
  //   sign_out();
  // }
  add_listeners();
}


async function donate(item_tag) {

  var currentUser = firebase.auth().currentUser.uid;
  var donation_num;
  var location = 'users/' + currentUser + "/donation_types";

  var donation_ref = firebase.database().ref('users/' + currentUser + "/donation_types/" + item_tag);
  await donation_ref.once("value").then(function(snapshot) {
    donation_num = snapshot.val();
    console.log(donation_num);
  });

  firebase.database().ref(location).child(item_tag + "").set(donation_num + 1);
}

function createDonationRequest(req, lat, lang, type, org) {
  firebase.database().ref('donation_requests/' + req).child("lat").set(lat);
  firebase.database().ref('donation_requests/' + req).child("lang").set(lang);
  firebase.database().ref('donation_requests/' + req).child("type").set(type);
  firebase.database().ref('donation_requests/' + req).child("email").set(firebase.auth().currentUser.email);
  firebase.database().ref('donation_requests/' + req).child("organization").set(org);
}

function getRecommendations(donation_history_dict, possible_events) { // Sorted array of event objects, decreasing order of trend
  var max = Object.keys(donation_history_dict).reduce(function(a, b){ return donation_history_dict[a] > donation_history_dict[b] ? a : b });
  var donation_history_dict_2 = Object.assign({}, donation_history_dict);
  delete donation_history_dict_2[max]
  var max_2 = Object.keys(donation_history_dict_2).reduce(function(a, b){ return donation_history_dict_2[a] > donation_history_dict_2[b] ? a : b });

  var counter = 0;
  var rec_arr = [];
  var unused_buffer = [];
  var add_to_rec = true;
  for (var i = 0; i<15; i++) {
    if (i<possible_events.length){
      if ((possible_events[i]["type"] == max) || (possible_events[i]["type"] == max_2)) {
        rec_arr.push(i);
      } else {
        unused_buffer.push(i)
      }
    }
  }

  var buffer_counter = 0;
  while(add_to_rec){
    if(rec_arr.length>9){
      add_to_rec = false;
    } else {
      if(buffer_counter<unused_buffer.length){
        rec_arr.push(unused_buffer[buffer_counter]);
        buffer_counter ++;
      }
    }
    if(rec_arr.length>possible_events.length - 1){
      add_to_rec = false;
    }
  }

  return rec_arr;
}

async function send_donate_notif() {
  Email.send("email.paragon.official@gmail.com",
    await firebase.database().ref('donation_requests/email').once("value").then(function(snapshot){
      var email = snapshot.val();
    }),
    "This is a subject",
    "this is the body",
    "smtp.yourisp.com",
    "username",
    "password");
}

function send_donate_notif() {

}

function push_lat_long(userID, lat, long, name) {
  firebase.database().ref('normCoords/' + userID).child("lat").set(lat);
  firebase.database().ref('normCoords/' + userID).child("long").set(long);
  firebase.database().ref('normCoords/' + userID).child("name").set(name);
}

async function read_lat_long(){
  var results;
  await firebase.database().ref('normCoords/').once("value").then(function(snapshot){
    results = snapshot.val();
  });
  return results;
}

async function read_lat_long(userID){
  var lat;
  var lng;
  var name;
  await firebase.database().ref('normCoords/' + userID + "/lat").once("value").then(function(snapshot){
    lat = snapshot.val();
  });
  await firebase.database().ref('normCoords/' + userID + "/long").once("value").then(function(snapshot){
    lng = snapshot.val();
  });
  await firebase.database().ref('normCoords/' + userID + "/name").once("value").then(function(snapshot){
    name = snapshot.val();
  });
  return {lat: lat, lng:lng, name:name};
}
