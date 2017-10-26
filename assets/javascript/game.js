
// TO-DOs=============================================================================================

//Score is not persistant in firebase -- needs fix.
//figure out how to assign player1 or player2 so only one set of buttons will show on screen.





//=====================================================================================================




// Intialize Firebase



  var config = {
    apiKey: "AIzaSyBe09j5PBh4N3sAQjJ3W2yzALPgzAEnvI0",
    authDomain: "rps-game-5b52e.firebaseapp.com",
    databaseURL: "https://rps-game-5b52e.firebaseio.com",
    projectId: "rps-game-5b52e",
    storageBucket: "rps-game-5b52e.appspot.com",
    messagingSenderId: "163598045066"
  };

  firebase.initializeApp(config);


  var database = firebase.database();


//=======================================================

// Set Player names

// $(`#nameButton`).on("click", function(){
//   $(`#name`).html($(`#playerName`).val().trim());
// })

playerOneScore = 0;
playerTwoScore = 0;


p1ready = $.Deferred();

p2ready = $.Deferred();

var players = {

  playerOne: {
    name: "First Player",
    score: playerOneScore,
    choice: null,
    present: false,
  },

  playerTwo: {
    name: "Second Player",
    score:playerTwoScore,
    choice: null,
    present: false,
  },

};

database.ref().set(players);

var choiceOneRef = database.ref(`playerOne/choice`);
// var playerOnePresentRef = database.ref(`playerOne/present`);










var choiceOneRef = database.ref(`playerOne/choice`);
choiceOneRef.on(`value`, function(snapshot){
  console.log(`P1 choice: ` + snapshot.val());
  players.playerOne.choice = snapshot.val();

  if(players.playerOne.choice != null){
      p1ready.resolve();
      }


  });





var choiceTwoRef = database.ref(`playerTwo/choice`);
choiceTwoRef.on(`value`, function(snapshot){
  console.log(`P2 choice: ` + snapshot.val());
  players.playerTwo.choice = snapshot.val(); 

    if(players.playerTwo.choice != null){

      p2ready.resolve();
    }   

});








// ALL THIS WORKS=================================================


  // Promise

    var playersReady = $.when(p1ready, p2ready);


    playersReady.done(function(){
        playGame(players.playerOne.choice, players.playerTwo.choice);

    });

  //==========================================================


  // Buttons================================
    $(document.body).on("click", ".rock-button", function(){


      if($(this).hasClass("playerOne")){
        players.playerOne.choice = `rock`;
        database.ref(`playerOne/choice`).set(players.playerOne.choice);
      }


      if($(this).hasClass("playerTwo")){
        players.playerTwo.choice = `rock`;
        database.ref(`playerTwo/choice`).set(players.playerTwo.choice);
      }
     
    })


    $(document.body).on("click", ".paper-button", function(){

      if($(this).hasClass("playerOne")){
        players.playerOne.choice = `paper`;
        database.ref(`playerOne/choice`).set(players.playerOne.choice);
      }

      if($(this).hasClass("playerTwo")){
        players.playerTwo.choice = `paper`;
        database.ref(`playerTwo/choice`).set(players.playerTwo.choice);
      }

      
    })

    $(document.body).on("click", ".scissors-button", function(){

      if($(this).hasClass("playerOne")){
        players.playerOne.choice = `scissors`;
        database.ref(`playerOne/choice`).set(players.playerOne.choice);

      }

      if($(this).hasClass("playerTwo")){
        players.playerTwo.choice = `scissors`;
        database.ref(`playerTwo/choice`).set(players.playerTwo.choice);
      }
      
    })

  // ===========================================



  //Game logic

    function playGame(p1, p2){

      //Tie Game
      if(p1 === p2){
        console.log("Tie Game");
        $(`#winner`).html(`Tie Game!`);

      }


      //Rock Wins
      else if(p1 === `rock` && p2 === `scissors`){
        console.log(`Player one wins!`);
        players.playerOne.score++;
        database.ref(`playerOne/score`).set(players.playerOne.score);
        $(`#pOneScore`).html(players.playerOne.score);
        $(`#winner`).html(`Player one wins!`);
      }

      else if(p2 === `rock` && p1 === `scissors`){
        console.log(`Player two wins!`);
        players.playerTwo.score++;
        database.ref(`playerTwo/score`).set(players.playerTwo.score);
        $(`#pTwoScore`).html(players.playerTwo.score);
        $(`#winner`).html(`Player two wins!`);
      }

      //Paper Wins
      else if(p1 === `paper` && p2 === `rock`){
        console.log(`Player one wins!`);
        players.playerOne.score++;
        database.ref(`playerOne/score`).set(players.playerOne.score);
        $(`#pOneScore`).html(players.playerOne.score);
        $(`#winner`).html(`Player one wins!`);

      }

      else if(p2 === `paper` && p1 === `rock`){
        console.log(`Player two wins!`);
        players.playerTwo.score++;
        database.ref(`playerTwo/score`).set(players.playerTwo.score);
        $(`#pTwoScore`).html(players.playerTwo.score);
        $(`#winner`).html(`Player two wins!`);
      }

      //Scissors wins
      else if(p1 === `scissors` && p2 === `paper`){
        console.log(`Player one wins!`);
        players.playerOne.score++;
        database.ref(`playerOne/score`).set(players.playerOne.score);
        $(`#pOneScore`).html(players.playerOne.score);
        $(`#winner`).html(`Player one wins!`);
      }


      else if(p2 === `scissors` && p1 === `paper`){
        console.log(`Player two wins!`);
        players.playerTwo.score++;
        database.ref(`playerTwo/score`).set(players.playerTwo.score);
        $(`#pTwoScore`).html(players.playerTwo.score);
        $(`#winner`).html(`Player two wins!`);
      }


      database.ref(`playerOne/choice`).set(null);
      database.ref(`playerTwo/choice`).set(null);

      console.log()

      p1ready = $.Deferred();
      p2ready = $.Deferred();

    }

  //==============================================


// ====================================================================