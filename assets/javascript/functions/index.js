const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});




// function playGame(p1, p2){

//     //Tie Game
//     if(p1 === p2){
//       console.log("Tie Game")
//     }


//     //Rock Wins
//     else if(p1 === `rock` && p2 === `scissors`){
//       console.log(`Player one wins!`);
//     }

//     else if(p2 === `rock` && p1 === `scissors`){
//       console.log(`Player two wins!`);
//     }

//     //Paper Wins
//     else if(p1 === `paper` && p2 === `rock`){
//       console.log(`Player one wins!`);
//     }

//     else if(p2 === `paper` && p1 === `rock`){
//       console.log(`Player two wins!`);
//     }

//     //Scissors wins
//     else if(p1 === `scissors` && p2 === `paper`){
//       console.log(`Player one wins!`);
//     }

//     else if(p2 === `scissors` && p1 === `paper`){
//       console.log(`Player two wins!`);
//     }
// }


