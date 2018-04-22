function login(email, password) {
  var email = document.getElementById("InputEmail1").value;
  var password = document.getElementById("InputPassword1").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });

  var charity_sign = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/is_special');
  await charity_sign.once("value").then(function(snapshot){
    var special = snapshot.val();
  });

  if(special){
    //window.location.href =
  }
  else{
    //window.location.href =
  }




  donate("random3");
  createDonationRequest("yoo", 2, 2, "random", "nanoseed")
  // generate_possible_events();
  getRecommendations()
  alert("here");
  add_listeners();
}

function sign_out() {
  firebase.auth().signOut()
  alert("signed out")
  add_listeners();
}

function sign_up() {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}


function admin_sign_up(){
    firebase.auth().
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
  var donation_history_dict_2 = _objectWithoutProperties(donation_history_dict, [str(max)])
  var max_2 = Object.keys(donation_history_dict_2).reduce(function(a, b){ return donation_history_dict_2[a] > donation_history_dict_2[b] ? a : b });

  var counter = 0;
  var rec_arr = [];
  var unused_buffer = [];
  var add_to_rec = true;
  for (var i = 0; i<15; i++) {
    if ((possible_events[i][type] == max) || (possible_events[i][type] == max_2)) {
      rec_arr.append(i);
    } else {
      save_to_unused.append(i)
    }
  }

  var buffer_counter = 0;
  while(add_to_rec){
    if(len(rec_arr)>9){
      add_to_rec = false;
    } else {
      if(buffer_counter<len(unused_buffer)){
        rec_arr.append(unused_buffer[buffer_counter]);
        buffer_counter ++;
      }
    }
  }

  return rec_arr;
}

function generate_possible_events() {
  // fill in with code to sort a given array of events by "trend". the trend property of an event is not yet initialized in firebase
}

async function send_donate_notif() {
  Email.send("email.paragon.official@gmail.com",
    await firebase.database().ref('donation_requests/email').once("value").then(function(snapshot){
      return snapshot.val();
    }),
    "Someone has shown interest in your organization",
    firebase.auth().currentUser.email + ' wishes to send you a donation! \n Congratulations! \n Feel free to reach out to this individual',
  "smtp.yourisp.com",
  "username",
  "password");
}
