/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////


let pixelSize = 20;     // how big each 'pixel' looks on screen

let playerOne;    // Adding 2 players to the game
let playerTwo;
let target;       // and one target for players to catch.

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation

let score;        // Where we keep track of score and winner

let gameStarted; // a function to indicate whether the game started, will become 1 when keyPressed

let countdown; // a 3s countdown to trigger auction, will reset after player movement

// adding necessary variables
let itemValues = [50,270,150]
let round = 1


function setup() {

  // createCanvas((displaySize*pixelSize), pixelSize);     // dynamically sets canvas size

  createCanvas(500, 500);     // dynamically sets canvas size

  display = new Display(displaySize, pixelSize);        //Initializing the display

  // Player (_color, _position, _displaySize)
  playerOne = new Player(color(255,0,0), 0, displaySize,"leftPlayer",300);   // Initializing players
  playerTwo = new Player(color(0,0,255), displaySize-1, displaySize,"rightPlayer",300);

  target = new Player(color(255,255,0), itemValues[round-1], displaySize);    // Initializing target using the Player class 

  collisionAnimation = new Animation();     // Initializing animation

  controller = new Controller();            // Initializing controller

  gameStarted = 0;


  countdown = 5

  score = {max:3000, winner:color(0,0,0)};     // score stores max number of points, and color 

}

function draw() {

  // start with a blank screen
  background(0, 0, 0);    

  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one 
  display.show();
  


}


