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
  // apiKey: "AIzaSyB-ujSDKh5YP7QcHQkaKqMqXegK2AZXJYM",
  // authDomain: "rps-multiplayer-252fb.firebaseapp.com",
  // databaseURL: "https://rps-multiplayer-252fb.firebaseio.com",
  // projectId: "rps-multiplayer-252fb",
  // storageBucket: "rps-multiplayer-252fb.appspot.com",
  // messagingSenderId: "967692116954"

   //Testing Environment - From Chris Fernandes personal project on Firebase. 
  // apiKey: "AIzaSyB4erVe309t0T4D-EnK2ZoJiqxqvS86aDE",
  // authDomain: "rps-multiplayer-dev.firebaseapp.com",
  // databaseURL: "https://rps-multiplayer-dev.firebaseio.com",
  // projectId: "rps-multiplayer-dev",
  // storageBucket: "rps-multiplayer-dev.appspot.com",
  // messagingSenderId: "474940701437"

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




localStorageNameInput = localStorage.getItem("rpsMPnameInput");
  localStorageCodeInput = localStorage.getItem("rpsMPcodeInput");

  if (localStorageNameInput !== null) {
    $("#name-input").val(localStorageNameInput);
  }

  if (localStorageCodeInput !== null) {
    $("#code-input").val(localStorageCodeInput);
  }

// Create a variable to reference the database.
var database = firebase.database();

database.ref(dbRefPathAddPlayers).on("value", function (snapshot) {
  var databaseObject = snapshot.val();
  dbObjectRefPathAddPlayers = snapshot.val();



  if (snapshot.child("Player1").exists()) {
   
    $("#p1name").html(databaseObject.Player1.name);
  }
  else{
    
    $("#p1name").html("Awaiting Player 1");

      database.ref(dbRefPathPlayers + "Player1/").remove();

    if (snapshot.child("Player2").exists()) {
     
      database.ref(dbRefPathAddPlayers + "GameStatus/").set({
        status: "Player 2 is ready!  Awaiting Player 1 to join..."
    });

    }


  }

  if (snapshot.child("Player2").exists()) {
   
    $("#p2name").html(databaseObject.Player2.name);
  }
  else{
    
    $("#p2name").html("Awaiting Player 2");

    database.ref(dbRefPathPlayers + "Player2/").remove();

    if (snapshot.child("Player1").exists()) {
      
            database.ref(dbRefPathAddPlayers + "GameStatus/").set({
        status: "Player 1 is ready!  Awaiting Player 2 to join..."
    });
    }

  }

  if (snapshot.child("Player1").exists() && snapshot.child("Player2").exists()) {

    database.ref(dbRefPathAddPlayers + "GameStatus/").set({
      status: "Game in Progress!!"
  });

  }
  // else{

  //   database.ref(dbRefPathAddPlayers + "GameStatus/").set({
  //     status: "Awaiting 2 players to join..."
  // });

  // }


  


});


database.ref(dbRefPathAddPlayers + "GameStatus/").on("value", function (snapshot) {
  var databaseObject = snapshot.val();

 
  if (snapshot.child("status").exists()){
   
    $("#game-progress").html(databaseObject.status);

  }

});


database.ref(dbRefPathAddPlayers + "RoundStatus/").on("value", function (snapshot) {
  var databaseObject = snapshot.val();

 
  if (snapshot.child("status").exists()){
   
    $("#round-results").html(databaseObject.status);

  }

});






// Whenever a user clicks the submit-bid button
$("#add-player").on("click", function (event) {
  event.preventDefault();

  localStorageNameInput = localStorage.getItem("rpsMPnameInput");
  localStorageCodeInput = localStorage.getItem("rpsMPcodeInput");

  if (localStorageNameInput === null) {
    localStorage.setItem("rpsMPnameInput", $("#name-input").val());
    localStorageNameInput = $("#name-input").val();

  }

  if (localStorageCodeInput === null) {
    localStorage.setItem("rpsMPcodeInput", $("#code-input").val());
    localStorageNameInput = $("#code-input").val();
  }

  database.ref(dbRefPathAddPlayers).on("value", function (snapshot) {
    dbObjectAddPlayers = snapshot.val();


    // if (snapshot.child("Player1").exists() && snapshot.child("Player2").exists()){
      
    //   if ($("#name-input").length){
    //     player = $("#name-input").val();
    //     alert("a");
    //     alert(player);
    //   }

    //   var playerCode = $("#code-input").val();
    //   $("#instructionsAndConnect").empty();
    //   $("#button-row").empty();
      
         
    //     con.update({
    //             name: player
    //           });
     
     
    //          database.ref(dbRefPathAddPlayers + player + "/").set({
    //           name: player,
    //           key: con.key,
    //           code: playerCode,
    //           career: ""
    //         });

            

      
    //         database.ref(dbRefPathAddPlayers + player + "/").onDisconnect().remove();

    // }




  
  
    if (snapshot.child("Player1").exists() && bRoundComplete === false) {
      
        getPlayer1Career(dbObjectAddPlayers.Player1.career);

      if (snapshot.child("Player2").exists() && bRoundComplete === false) {
       
        getPlayer2Career(dbObjectAddPlayers.Player2.career);
      } else {

          var bPlayer2Exists = false;
          if (snapshot.child("Player2").exists()){
            bPlayer2Exists = true;
          }
          else{
            bPlayer2Exists = false;
          }
    
        if ( bPlayer2Exists === false && $("#name-input").length) {
          
          player2 = $("#name-input").val();
         // player =  player2 ;
          player2Code = $("#code-input").val();

          dbRefPathPlayer2Career = dbRefPath + "Career/" + player2 + "|" + player2Code + "/";

          $("#instructionsAndConnect").empty();
          
          isPlayer2 = true;

         

          con.update({
            name: player2
          });

          database.ref(dbRefPathAddPlayers + "Player2/").set({
            name: player2,
            key: con.key,
            code: player2Code,
            career: dbRefPathPlayer2Career
          });

          // showNewViewer(player2);


          database.ref(dbRefPathAddPlayers + "Player2/").onDisconnect().remove();

          database.ref(dbRefPathAddPlayers + "GameStatus/").set({
            status: "Game in Progress!!"
         });

          getPlayer1Career(dbObjectAddPlayers.Player1.career);

          getPlayer2Career(dbObjectAddPlayers.Player2.career);

        } // If player 2 is  blank


      }
    } else {

      var bPlayer1Exists = false;
      if (snapshot.child("Player1").exists()){
        bPlayer1Exists = true;
      }
      else{
        bPlayer1Exists = false;
      }




      if (bPlayer1Exists === false) {
        
        player1 = $("#name-input").val();
       // player =  player1 ;
        player1Code = $("#code-input").val();

        dbRefPathPlayer1Career = dbRefPath + "Career/" + player1 + "|" + player1Code + "/";

        $("#instructionsAndConnect").empty();
      
        
        isPlayer1 = true;
        //player1 = databaseObject.Player1.name;
        con.update({
          name: player1
        });


        database.ref(dbRefPathAddPlayers + "Player1/").set({
          name: player1,
          key: con.key,
          code: player1Code,
          career: dbRefPathPlayer1Career
        });




        database.ref(dbRefPathAddPlayers + "Player1/").onDisconnect().remove();
 
        database.ref(dbRefPathAddPlayers + "GameStatus/").set({

               status: "Player 1 is ready!  Awaiting Player 2 to join..."
            });

            database.ref(dbRefPathAddPlayers + "GameStatus/").onDisconnect().remove();

        getPlayer1Career(dbObjectRefPathAddPlayers.Player1.career);
        getPlayer2Career(dbObjectRefPathAddPlayers.Player2.career);


      }

    } //if player1 is blank


  });


  $("#player1CareerWinLossCount").html("Career Win: " + 0 + " , Loss:" + 0);
  $("#player2CareerWinLossCount").html("Career Win: " + 0 + " , Loss:" + 0);

});


// function showNewViewer(viewerName){

//   $("#new-viewer").html(viewerName+ " has joined.");

//   $("#new-viewer-alert").fadeTo(5000, 500).slideUp(500, function(){
//   $("#new-viewer").slideUp(500);
//   });
  


// }

function getPlayer1Career(career) {

  database.ref(career).on("value", function (snapshot) {

    var databaseObject = snapshot.val();

    if (snapshot.child("Wins").exists()) {
      player1CareerWinCount = databaseObject.Wins;
      $("#player1CareerWinLossCount").html("Career Win: " + player1CareerWinCount + " , ");
    } else {
      player1CareerWinCount = 0;
      $("#player1CareerWinLossCount").html("Career Win: 0 , ");
    }

    if (snapshot.child("Losses").exists()) {
      player1CareerLossCount = databaseObject.Losses;
      $("#player1CareerWinLossCount").append("Loss: " + player1CareerLossCount);
    } else {
      player1CareerLossCount = 0;
      $("#player1CareerWinLossCount").append("Loss: 0");
    }


  });
}

function getPlayer2Career(career) {

  database.ref(career).on("value", function (snapshot) {

    var databaseObject = snapshot.val();

    if (snapshot.child("Wins").exists()) {
      player2CareerWinCount = databaseObject.Wins;
      $("#player2CareerWinLossCount").html("Career Win: " + player2CareerWinCount + " , ");
    } else {
      player2CareerWinCount = 0;
      $("#player2CareerWinLossCount").html("Career Win: 0 , ");
    }

    if (snapshot.child("Losses").exists()) {
      player2CareerLossCount = databaseObject.Losses;
      $("#player2CareerWinLossCount").append("Loss: " + player2CareerLossCount );
    } else {
      player2CareerLossCount = 0;
      $("#player2CareerWinLossCount").append("Loss: 0");
    }




  });
}






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


var player1Ref = database.ref(dbRefPathAddPlayers + "Player1/");
var player2Ref = database.ref(dbRefPathAddPlayers + "Player2/");


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
  
      var peopleConnected ="";
  $("#people-connected").empty();
  //loop through connections and return keys
  snap.forEach(function(childsnap){
  

    var dbObjectChildSnap = childsnap.val();

    if (childsnap.child("name").exists()){
      
     
         
        //Is not found in the people Connected string.
        if (peopleConnected.indexOf(dbObjectChildSnap.name) === -1){
          
          peopleConnected = peopleConnected + "<b>Name:</b> " + dbObjectChildSnap.name + " | ";
          player = dbObjectChildSnap.name;

        }
        //If anonymous key is found in found in peopleConnected string.
        if (peopleConnected.indexOf(childsnap.key) !== -1){
         
          //remove the key associated to the Name if found.
          peopleConnected = peopleConnected.replace("Anonymous: " + childsnap.key +  " | ",' ');
          player = childsnap.key;
        }

    }
    //If name key not found
    else{
     
      //Is not found in the people Connected string.
      if (peopleConnected.indexOf(childsnap.key) === -1){
        
        peopleConnected = peopleConnected + "<b>Anonymous:</b> " + childsnap.key + " | ";
        player = childsnap.key;
      }
      else{
        
      }

        


       
     }
    
     $("#people-connected").html(peopleConnected);

  });


});






// $("#add-chat").on("click", function (event) {
//   event.preventDefault();


//     var chatMsg = $("#chat-input").val();
//     $("#chat-input").val("");

//       database.ref(dbRefPathAddPlayers + "Chat/").push({
//         chatDate:  moment().format("MM/DD/YYYY hh:mm a"),
//         chatPlayerName: player,
//         chatPlayerMsg: chatMsg
//     });

// });


// alert("A");
// var tr = $("<tr>");
// var tdChatDate = $("<td>");
// var tdChatPlayerName = $("<td>");
// var tdChatPlayerMsg = $("<td>");

// tdChatDate.html("Date");
// tdChatPlayerName.html("Name");
// tdChatPlayerMsg.html("Message");

// tr.append(tdChatDate);
//  tr.append(tdChatPlayerName);
//  tr.append(tdChatPlayerMsg);

//  $("#chat-msgs").append(tr);






// database.ref(dbRefPathAddPlayers + "Chat/").on("child_added", function (snapshot) {
//   var dbObjectChat = snapshot.val();

//   $("#chatPlayerMsg").html(dbObjectChat.chatDate + " " + dbObjectChat.chatPlayerName + " says: " + dbObjectChat.chatPlayerMsg);

//   $("#success-alert").fadeTo(5000, 500).slideUp(500, function(){
  
//     $("#success-alert").slideUp(500);
//   });

//   alert("B");
//   var tr = $("<tr>");
//   var tdChatDate = $("<td>");
//   var tdChatPlayerName  = $("<td>");
//   var tdChatPlayerMsg = $("<td>");
  

//   tdChatDate.append(dbObjectChat.chatDate);
//   tdChatPlayerName.append(dbObjectChat.chatPlayerName);
//   tdChatPlayerMsg.append(dbObjectChat.chatPlayerMsg);

//  tr.append(tdChatDate);
//    tr.append(tdChatPlayerName);
//    tr.append(tdChatPlayerMsg);

//    $("#chat-msgs").append(tr);




// });



// database.ref(dbRefPathAddPlayers + "Chat/").on("value", function (snapshot) {
//    dbObjectChat = snapshot.val();

//   var bClearChat = false;

//  if (snapshot.numChildren() > 10){

//       var num = 1;
//       var numRemove = 6;

//       snapshot.forEach(function(childsnap){
          
//               if (num <= numRemove){        
//              database.ref(dbRefPathAddPlayers + "Chat/" + childsnap.key + "/").remove();
//             } 
//              num++;
//       });

//       $("#chat-msgs").empty();
      

//       alert("c");
//       var tr = $("<tr>");
//       var tdChatDate = $("<td>");
//       var tdChatPlayerName = $("<td>");
//       var tdChatPlayerMsg = $("<td>");
      
//       tdChatDate.html("Date");
//       tdChatPlayerName.html("Name");
//       tdChatPlayerMsg.html("Message");
      
//       tr.append(tdChatDate);
//        tr.append(tdChatPlayerName);
//        tr.append(tdChatPlayerMsg);
      
//        $("#chat-msgs").append(tr);

        





//  }

 


// });


// ----------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref(dbRefPathPlayers).on("value", function (snapshot) {


  dbObjectAddPlayers = snapshot.val();

  if (snapshot.child("Player1").child("Name").exists()) {
    player1 = dbObjectAddPlayers.Player1.name;
    $("#player1Name").html(player1);
  }

  if (snapshot.child("Player2").child("Name").exists()) {
    player2 = dbObjectAddPlayers.Player2.name;
    $("#player2Name").html(player2);
  }






  var player1Choice = null;
  var player2Choice = null;

  if (snapshot.child("Player1").child("Choice").exists()) {
    player1Choice = dbObjectAddPlayers.Player1.Choice.Choice;
  }

  if (snapshot.child("Player2").child("Choice").exists()) {
    player2Choice = dbObjectAddPlayers.Player2.Choice.Choice;
  }


  if (snapshot.child("Player1").child("WinsLosses").child("Wins").exists() && bRoundComplete === false) {
    player1WinCount = dbObjectAddPlayers.Player1.WinsLosses.Wins;
  }

  if (snapshot.child("Player2").child("WinsLosses").child("Wins").exists() && bRoundComplete === false) {
    player2WinCount = dbObjectAddPlayers.Player2.WinsLosses.Wins;
  }

  if (snapshot.child("Player1").child("WinsLosses").child("Losses").exists() && bRoundComplete === false) {
    player1LossCount = dbObjectAddPlayers.Player1.WinsLosses.Losses;
  }

  if (snapshot.child("Player2").child("WinsLosses").child("Losses").exists() && bRoundComplete === false) {
    player2LossCount = dbObjectAddPlayers.Player2.WinsLosses.Losses;
  }








  if (player1WinCount !== null) {
    $("#player1WinLossCount").html("Round Win: " + player1WinCount + " , ");
  }

  if (player2WinCount !== null) {
    $("#player2WinLossCount").html("Round Win: " + player2WinCount+ " , ");
  }

  if (player1LossCount !== null) {
    $("#player1WinLossCount").append("Loss: " + player1LossCount+ " ");
  }

  if (player2LossCount !== null) {
    $("#player2WinLossCount").append("Loss: " + player2LossCount+ " ");
  }





  if (player1Choice !== null) {
    $(".player1Img").attr("src", "./assets/images/checkmark.png");
  } else if (bRoundCompleteImageDelay === true) {
    $(".player1Img").attr("src", player1ResultImg);
  } else {
    $(".player1Img").attr("src", "./assets/images/question.png");
  }

  if (player2Choice !== null) {
    $(".player2Img").attr("src", "./assets/images/checkmark.png");
  } else if (bRoundCompleteImageDelay === true) {
    $(".player2Img").attr("src", player2ResultImg);

  } else {
    $(".player2Img").attr("src", "./assets/images/question.png");
  }





  if (player1Choice !== null && player2Choice !== null) {

    bRoundComplete = true;
    bRoundCompleteImageDelay = true;
    // if (bRoundComplete === true) {
    //   bRoundComplete = false;
      startResultsTimeout = setTimeout(function () {

        clearTimeout(startResultsTimeout);
        bRoundCompleteImageDelay = false;
        $(".player1Img").attr("src", "./assets/images/question.png");
        $(".player2Img").attr("src", "./assets/images/question.png");

        database.ref(dbRefPathAddPlayers + "RoundStatus/").set({
          status: "waiting for results"
      });
    

      }, 3000);


    // }


    player1Wins = false;
    player2Wins = false;


    if (player1Choice === "r") {
      if (player2Choice === "p") {
        player1ResultImg = "./assets/images/rocklose.png";
        player2ResultImg = "./assets/images/paperwin.png";
        statusmsg = dbObjectRefPathAddPlayers.Player2.name + " wins! Paper beats Rock";
        player1Wins = false;
        player2Wins = true;
      } else if (player2Choice === "r") {
        player1ResultImg = "./assets/images/rocktie.png";
        player2ResultImg = "./assets/images/rocktie.png";
        statusmsg = "It's a tie! " + dbObjectRefPathAddPlayers.Player1.name + " and " + dbObjectRefPathAddPlayers.Player2.name + " chose the same. Rock equals Rock";
        player1Wins = false;
        player2Wins = false;
      } else if (player2Choice === "s") {
        player1ResultImg = "./assets/images/rockwin.png";
        player2ResultImg = "./assets/images/scissorslose.png";
        statusmsg = dbObjectRefPathAddPlayers.Player1.name + " wins! Rock beats Scissor";
        player1Wins = true;
        player2Wins = false;
      }
    } else if (player1Choice === "p") {

      if (player2Choice === "p") {
        player1ResultImg = "./assets/images/papertie.png";
        player2ResultImg = "./assets/images/papertie.png";
        statusmsg = "It's a tie! " + dbObjectRefPathAddPlayers.Player1.name + " and " + dbObjectRefPathAddPlayers.Player2.name + " chose the same. Paper equals Paper";
        player1Wins = false;
        player2Wins = false;
      } else if (player2Choice === "r") {
        player1ResultImg = "./assets/images/paperwin.png";
        player2ResultImg = "./assets/images/rocklose.png";
        statusmsg = dbObjectRefPathAddPlayers.Player1.name + " wins! Paper beats Rock";
        player1Wins = true;
        player2Wins = false;
      } else if (player2Choice === "s") {
        player1ResultImg = "./assets/images/paperlose.png";
        player2ResultImg = "./assets/images/scissorswin.png";
        statusmsg = dbObjectRefPathAddPlayers.Player2.name + " wins! Scissor beats Paper";
        player1Wins = false;
        player2Wins = true;
      }
    } else if (player1Choice === "s") {

      if (player2Choice === "p") {
        player1ResultImg = "./assets/images/scissorswin.png";
        player2ResultImg = "./assets/images/paperlose.png";
        statusmsg = dbObjectRefPathAddPlayers.Player1.name + " wins! Scissor beats Paper";
        player1Wins = true;
        player2Wins = false;
      } else if (player2Choice === "r") {
        player1ResultImg = "./assets/images/scissorslose.png";
        player2ResultImg = "./assets/images/rockwin.png";
        statusmsg = dbObjectRefPathAddPlayers.Player2.name + " wins! Rock beats Scissor";
        player1Wins = false;
        player2Wins = true;
      } else if (player2Choice === "s") {
        player1ResultImg = "./assets/images/scissorstie.png";
        player2ResultImg = "./assets/images/scissorstie.png";
        statusmsg = "It's a tie! " + dbObjectRefPathAddPlayers.Player1.name + " and " + dbObjectRefPathAddPlayers.Player2.name + " chose the same. Scissor equals Scissor";
        player1Wins = false;
        player2Wins = false;
      }






    } else {
      statusmsg = "";
    }
    

    database.ref(dbRefPathAddPlayers + "RoundStatus/").onDisconnect().remove();

    database.ref(dbRefPathAddPlayers + "RoundStatus/").set({
      status: statusmsg
  });



    database.ref(dbRefPathPlayers + "Player1/Choice/").set({
      Choice: null
    });

    database.ref(dbRefPathPlayers + "Player2/Choice/").set({
      Choice: null
    });

    //housekeeping to automatically remove data if the user disconnects.
    database.ref(dbRefPathPlayers + "Player1/Choice/").onDisconnect().remove();
    database.ref(dbRefPathPlayers + "Player2/Choice/").onDisconnect().remove();
    database.ref(dbRefPathPlayers + "Player1/WinsLosses/").onDisconnect().remove();
    database.ref(dbRefPathPlayers + "Player2/WinsLosses/").onDisconnect().remove();

    if (player1Wins === true) {
      player1Wins = false;
      player2Wins = false;
      player1WinCount++;
      player2LossCount++;
      player1CareerWinCount++;
      player2CareerLossCount++;
     
    } else if (player2Wins === true) {
      player1Wins = false;
      player2Wins = false;
      player2WinCount++;
      player1LossCount++;
      player2CareerWinCount++;
      player1CareerLossCount++;
     

    }

    database.ref(dbRefPathPlayers + "Player1/WinsLosses/").set({
      Wins: player1WinCount,
      Losses: player1LossCount
    });

   
    database.ref(dbRefPathPlayers + "Player2/WinsLosses/").set({
      Wins: player2WinCount,
      Losses: player2LossCount
    });


    database.ref(dbObjectRefPathAddPlayers.Player1.career).set({
      Wins: player1CareerWinCount,
      Losses: player1CareerLossCount
    });


    database.ref(dbObjectRefPathAddPlayers.Player2.career).set({
      Wins: player2CareerWinCount,
      Losses: player2CareerLossCount
    });

  


    $("#round-results").html(statusmsg);
    player1Wins = false;
    player2Wins = false;




  }


















  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



// Whenever a user clicks the rock button
$("#rock").on("click", function (event) {
  event.preventDefault();

  if (isPlayer1 === true) {
  
    // Save the new price in Firebase
    database.ref(dbRefPathPlayers + "Player1/Choice/").set({
      Choice: "r",
    });

  } else if (isPlayer2 === true) {
   
    // Save the new price in Firebase
    database.ref(dbRefPathPlayers + "Player2/Choice/").set({
      Choice: "r",
    });
  }

});





$("#paper").on("click", function (event) {
  event.preventDefault();

  if (isPlayer1 === true) {
    // Save the new price in Firebase
    database.ref(dbRefPathPlayers + "Player1/Choice/").set({
      Choice: "p",
    });
  } else if (isPlayer2 === true) {
    // Save the new price in Firebase
    database.ref(dbRefPathPlayers + "Player2/Choice/").set({
      Choice: "p",
    });
  }

});



$("#scissors").on("click", function (event) {
  event.preventDefault();

  if (isPlayer1 === true) {
    // Save the new price in Firebase
    database.ref(dbRefPathPlayers + "Player1/Choice/").set({
      Choice: "s",
    });


  } else if (isPlayer2 === true) {
    // Save the new price in Firebase
    database.ref(dbRefPathPlayers + "Player2/Choice/").set({
      Choice: "s",
    });


  }

});