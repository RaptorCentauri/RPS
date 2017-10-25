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


console.log(players);

database.ref().set(players);


//listen to firebase//

var readyOneRef = database.ref(`playerOne/ready`);
readyOneRef.on(`value`, function(snapshot){
  console.log(`P1 ready: ` + snapshot.val());
  // players.playerOne.ready = snapshot.val();
  if(snapshot.val() != `pending`){
    p1ready = snapshot.val();    
  }
    
});


var choiceOneRef = database.ref(`playerOne/choice`);
choiceOneRef.on(`value`, function(snapshot){
  console.log(`P1 choice: ` + snapshot.val());
  players.playerOne.choice = snapshot.val();  
});



var readyTwoRef = database.ref(`playerTwo/ready`);
readyTwoRef.on(`value`, function(snapshot){
  console.log(`P2 ready: ` + snapshot.val());
  // players.playerTwo.ready = snapshot.val();
  if(snapshot.val() != `pending`){
    p2ready = snapshot.val();    
  }
});


var choiceTwoRef = database.ref(`playerTwo/choice`);
choiceTwoRef.on(`value`, function(snapshot){
  console.log(`P2 choice: ` + snapshot.val());
  players.playerTwo.choice = snapshot.val();    

});





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
      players.playerOne.choice = `rock`;
      p1ready.resolve();
      players.playerOne.ready = p1ready.state();
      database.ref().set(players);
      // console.log(`p1 choice: ` + players.playerOne.choice);
      // console.log(`p1 ready: ` + players.playerOne.ready);
    }

    if($(this).hasClass("playerTwo")){
      players.playerTwo.choice = `rock`;
      p2ready.resolve();
      players.playerTwo.ready = p2ready.state();
      database.ref().set(players);
      console.log(`p2 choice: ` + players.playerTwo.choice);
      // console.log(`p2 ready: ` + players.playerTwo.ready);
    }
   
  })


  $(document.body).on("click", ".paper-button", function(){

    if($(this).hasClass("playerOne")){
      players.playerOne.choice = `paper`;
      p1ready.resolve();
      players.playerOne.ready = p1ready.state();
      database.ref().set(players);
      // console.log(`p1 choice: ` + players.playerOne.choice);
      // console.log(`p1 ready: ` + players.playerOne.ready);
    }

    if($(this).hasClass("playerTwo")){
      players.playerTwo.choice = `paper`;
      players.playerTwo.ready = p2ready.state();
      p2ready.resolve();
      players.playerTwo.ready = p2ready.state();
      database.ref().set(players);
      // console.log(`p2 choice: ` + players.playerTwo.choice);
      // console.log(`p2 ready: ` + players.playerTwo.ready);
    }

    
  })

  $(document.body).on("click", ".scissors-button", function(){

    if($(this).hasClass("playerOne")){
      players.playerOne.choice = `scissors`;
      p1ready.resolve();
      players.playerOne.ready = p1ready.state();
      database.ref().set(players);
      // console.log(`p1 choice: ` + players.playerOne.choice);
      // console.log(`p1 ready: ` + players.playerOne.ready);
    }

    if($(this).hasClass("playerTwo")){
      players.playerTwo.choice = `scissors`;
      players.playerTwo.ready = p2ready.state();
      p2ready.resolve();
      players.playerTwo.ready = p2ready.state();
      database.ref().set(players);
      // console.log(`p2 choice: ` + players.playerTwo.choice);
      // console.log(`p2 ready: ` + players.playerTwo.ready);
    }
    
  })

// ===========================================

//listen to FB



//======================


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