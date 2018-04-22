//var userID = firebase.auth().currentUser.uid;
async function getUser() {
  await firebase.auth().onAuthStateChanged(function(user) {
    var userID;
    if (user) {
      userID = user.uid;

      return userID;
    } else {
      // No user is signed in.
      console.log("No one is signed in");
    }

  });
}
let userID = getUser();
console.log(userID);
