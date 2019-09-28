/* global moment firebase */



// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  //Production Environment - From Chris Fernandes personal project on Firebase. 
  apiKey: "AIzaSyABoU8nk9TCf7MwR3iSJWIc6Bw478DfLyM",
  authDomain: "coffee-check-in.firebaseapp.com",
  databaseURL: "https://coffee-check-in.firebaseio.com",
  projectId: "coffee-check-in",
  storageBucket: "",
  messagingSenderId: "766833466808",
  appId: "1:766833466808:web:77dc635e8560ddbc3b834d",
  measurementId: "G-FXDKCVPD8N"


};

firebase.initializeApp(config);

var dbRefPath = "CoffeeCheckIn/"
var dbRefPathPlayers = dbRefPath + "Players/"
var dbRefPathAddPlayers = dbRefPath + "AddPlayers/"
var dbObjectRefPathAddPlayers;
var dbRefPathCareer = dbRefPath + "Career/"
var dbRefPathPlayer1Career = "";
var dbRefPathPlayer2Career = "";
var player1CareerWinCount = 0;
var player2CareerWinCount = 0;
var player1CareerLossCount = 0;
var player2CareerLossCount = 0;
var dbObjectAddPlayers;
var player = "";
var player1 = "";
var player2 = "";
var player1Code = "";
var player2Code = "";
var isPlayer1 = false;
var isPlayer2 = false;
var player1WinCount = 0;
var player2WinCount = 0;
var player1LossCount = 0;
var player2LossCount = 0;
var player1Wins = false;
var player2Wins = false;
var startResultsTimeout;
var player1ResultImg = "";
var player2ResultImg = "";
var bRoundComplete = false;
var bRoundCompleteImageDelay = false;
var con;
var localStorageNameInput;
var localStorageCodeInput;




// localStorageNameInput = localStorage.getItem("rpsMPnameInput");
// localStorageCodeInput = localStorage.getItem("rpsMPcodeInput");

// if (localStorageNameInput !== null) {
//   $("#name-input").val(localStorageNameInput);
// }

// if (localStorageCodeInput !== null) {
//   $("#code-input").val(localStorageCodeInput);
// }

// Create a variable to reference the database.
var database = firebase.database();

database.ref(dbRefPathAddPlayers + "GameStatus").on("value", function (snapshot) {
  var databaseObject = snapshot.val();

  if (snapshot.child("status").exists()) {

    $("#game-progress").html(databaseObject.status);

  }

});



// Whenever a user clicks the connect button
$("#add-player").on("click", function (event) {
  event.preventDefault();

  database.ref(dbRefPathAddPlayers).on("value", function (snapshot) {
    dbObjectAddPlayers = snapshot.val();

    // var bPlayer1Exists = false;
    // if (snapshot.child("Player1").exists()) {
    //   bPlayer1Exists = true;
    // } else {
    //   bPlayer1Exists = false;
    // }


    // database.ref(dbRefPathAddPlayers + "Player1/").set({
    //   name: player1,
    //   key: con.key,
    //   code: player1Code,
    //   career: dbRefPathPlayer1Career
    // });

    //database.ref(dbRefPathAddPlayers + "Player1/").onDisconnect().remove();

    database.ref(dbRefPathAddPlayers + "GameStatus/").set({

      status: "Ready for service!"
    });



  });


  // --------------------------------------------------------------
  // Link to Firebase Database for viewer tracking

  // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref(dbRefPath + "/connections/");

  // '.info/connected' is a special location provided by Firebase that is updated every time
  // the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");


  // var player1Ref = database.ref(dbRefPathAddPlayers + "Player1/");
  // var player2Ref = database.ref(dbRefPathAddPlayers + "Player2/");


  // When the client's connection state changes...
  connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {
      // Add user to the connections list.

      con = connectionsRef.push(true);

      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();

      // con.onDisconnect().set("I disconnected!");
      //  showNewViewer(con.key);




    }
  });

  // When first loaded or when the connections list changes...
  connectionsRef.on("value", function (snap) {
    dbObjectViewersSnap = snap.val();
    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").html("<br>" + snap.numChildren() + ' viewer(s) connected: ');

    var peopleConnected = "";
    $("#people-connected").empty();
    //loop through connections and return keys
    snap.forEach(function (childsnap) {


      var dbObjectChildSnap = childsnap.val();

      if (childsnap.child("name").exists()) {



        //Is not found in the people Connected string.
        if (peopleConnected.indexOf(dbObjectChildSnap.name) === -1) {

          peopleConnected = peopleConnected + "<b>Name:</b> " + dbObjectChildSnap.name + " | ";
          player = dbObjectChildSnap.name;

        }
        //If anonymous key is found in found in peopleConnected string.
        if (peopleConnected.indexOf(childsnap.key) !== -1) {

          //remove the key associated to the Name if found.
          peopleConnected = peopleConnected.replace("Anonymous: " + childsnap.key + " | ", ' ');
          player = childsnap.key;
        }

      }
      //If name key not found
      else {

        //Is not found in the people Connected string.
        if (peopleConnected.indexOf(childsnap.key) === -1) {

          peopleConnected = peopleConnected + "<b>Anonymous:</b> " + childsnap.key + " | ";
          player = childsnap.key;
        } else {

        }





      }

      $("#people-connected").html(peopleConnected);

    });


  });


  // ----------------------------------------------------------------
  // At the page load and subsequent value changes, get a snapshot of the local data.
  // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
  // database.ref(dbRefPathPlayers).on("value", function (snapshot) {


  //   dbObjectAddPlayers = snapshot.val();

  //   if (snapshot.child("Player1").child("Name").exists()) {
  //     player1 = dbObjectAddPlayers.Player1.name;
  //     $("#player1Name").html(player1);
  //   }

  //   // If any errors are experienced, log them to console.
  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });


});