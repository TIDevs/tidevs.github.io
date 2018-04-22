$(document).ready(function () {
  $("#sign_button").click(function() {
    // $("InputPassword1").val().equiv("") ||
    if($("#InputPassword1").val()!=$("#InputPassword2").val()){
      $("#m_alert").css("visibility", "visible");
    } else {
      sign_up($("#InputEmail1").val(), $("#InputPassword1").val(), true, $("#orgName").val());
    }
  });
  $("#sign_button_2").click(function() {
    // ignore
  });
  $("#close").click(function() {
    $("#m_alert").css("visibility", "hidden");
  })

  async function sign_up(email, password, special, orgName) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
    if(firebase.auth().currentUser != null){
      var currentUser = firebase.auth().currentUser.uid;
      var donation_ref = firebase.database().ref('users/' + currentUser + "/donation_types");
      var location = 'users/' + currentUser;
      // alert(special);
      if (special){
        firebase.database().ref(location).child("special").set(true);
        firebase.database().ref(location).child("orgName").set(orgName);
      } else {
        firebase.database().ref(location).child("special").set(false);
      }
    }
  }
});
