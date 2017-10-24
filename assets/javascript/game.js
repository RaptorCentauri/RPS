// Intialize Firebase

    // ready: $.Deferred(function (){return true;}),


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

//Player names
// firstPlayer = $(`#playerOneName`).val().trim();
// $("#firstPlayer").html($(`#playerOneName`).val().trim());


p1ready = $.Deferred();

p2ready = $.Deferred();

var players = {

  playerOne: {
    choice: ``,
    ready: p1ready.state(),
  },

  playerTwo: {
    choice: ``,
    ready: p2ready.state(),
  },

};



console.log(p1ready.state());

console.log(players.playerOne.ready);

console.log(typeof(players.playerOne.ready));

database.ref().set(players);
// database.ref().set(p1ready);
// database.ref().set(p2ready);


console.log(players);

// Promise
//==========================================================

  // var playersReady = $.when(players.playerOne.ready, players.playerTwo.ready);
  var playersReady = $.when(p1ready, p2ready);


  playersReady.done(function(){
      playGame(players.playerOne.choice, players.playerTwo.choice);

  });





//==========================================================


// Buttons================================
  $(document.body).on("click", ".rock-button", function(){

    if($(this).hasClass("playerOne")){
      console.log(`P1 clicked rock`);
      players.playerOne.choice = `rock`;
      p1ready.resolve();
      database.ref().set(players);
      console.log(players.playerOne.choice);

    }

    if($(this).hasClass("playerTwo")){
      console.log(`P2 clicked rock`);
      players.playerTwo.choice = `rock`;
      p2ready.resolve();
      database.ref().set(players);
      console.log(players);
    }
   
  })


  $(document.body).on("click", ".paper-button", function(){

    if($(this).hasClass("playerOne")){
      console.log(`P1 clicked paper`);
      players.playerOne.choice = `paper`;
      p1ready.resolve();
      console.log(players);
      database.ref().set(players);
    }

    if($(this).hasClass("playerTwo")){
      console.log(`P2 clicked paper`);
      players.playerTwo.choice = `paper`;
      // players.playerTwo.ready.resolve();
      p2ready.resolve();
      database.ref().set(players);
      console.log(players);
    }

    
  })

  $(document.body).on("click", ".scissors-button", function(){

    if($(this).hasClass("playerOne")){
      console.log(`P1 clicked scissors`);
      players.playerOne.choice = `scissors`;
      p1ready.resolve();
      console.log(players);
      database.ref().set(players);
    }

    if($(this).hasClass("playerTwo")){
      console.log(`P2 clicked scissors`);
      players.playerTwo.choice = `scissors`;
      p2ready.resolve();
      database.ref().set(players);
      console.log(players);
    }
    
  })

// ===========================================


//Game logic


function playGame(p1, p2){

    //Tie Game
    if(p1 === p2){
      console.log("Tie Game")
    }


    //Rock Wins
    else if(p1 === `rock` && p2 === `scissors`){
      console.log(`Player one wins!`);
    }

    else if(p2 === `rock` && p1 === `scissors`){
      console.log(`Player two wins!`);
    }

    //Paper Wins
    else if(p1 === `paper` && p2 === `rock`){
      console.log(`Player one wins!`);
    }

    else if(p2 === `paper` && p1 === `rock`){
      console.log(`Player two wins!`);
    }

    //Scissors wins
    else if(p1 === `scissors` && p2 === `paper`){
      console.log(`Player one wins!`);
    }

    else if(p2 === `scissors` && p1 === `paper`){
      console.log(`Player two wins!`);
    }
}
  
  

//==============================================