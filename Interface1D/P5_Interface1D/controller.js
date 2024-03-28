
// This is where your state machines and game logic lives

let displaySize = 50;   // how many pixels are visible in the game
let pricing_countdown = 5

class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "PRICING";

    }



    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////


        switch (this.gameState) {


            case "PRICING":
                display.clear();

                // show the currentbid
                // blink three times
                console.log("PRICING STATE");

                // switch to the "PLAY" state
                display.setPixel(1, color(128,128,128));

                // You could implement a blinking effect by toggling the visibility of the bid
                // or by changing its color intermittently. Here's a conceptual way to blink three times:


                if (frameCount % 60 == 0 && pricing_countdown > 0) {
                    // Update and display the countdown every second
                    pricing_countdown -= 1; // Decrements the countdown by 1 every second
                }

                console.log("pricing_countdown=", pricing_countdown);

                if (pricing_countdown == 0){
                    this.gameState = "PLAY";
                }; // transitionDelay is the delay in milliseconds before switching states.
            break


            // This is the main game state, where the playing actually happens
            case "PLAY":
                // Clear screen at frame rate so we always start fresh      
                display.clear();
                console.log("PLAY STATE");
                // Show all players in the right place, by adding them to display buffer
                [playerOne, playerTwo].forEach(player => {

                    display.setPixel(player.position, player.playerColor);
                });
            
                if (gameStarted == 1 && frameCount % 60 == 0 && countdown > 0) {
                    // Update and display the countdown every second
                    countdown -= 1; // Decrements the countdown by 1 every second
                }
            
                if (countdown == 0) {
                    if (round < 3) {
                        // Calculate budget, score, and reset bids for both players
                        [playerOne, playerTwo].forEach(player => {
                            player.budget -= player.currentBid;
                            player.currentBid = 0; // Reset the bid for the new round.
                            player.currentBudget = player.budget; // Set the currentBudget for the next round based on remaining budget.
                            player.position = player === playerOne ? 0 : displaySize - 1; // Reset positions
                            player.updateScore(); // Update the score
                        });
            
                        // Reset the game for the new round
                        round += 1;
                        countdown = 5; // Reset countdown
                        display.clear();
                        // Optionally change the color for each round
                        // display.setAllPixels(roundColors[round-1]);
            
                        // Redraw players in their new positions
                        [playerOne, playerTwo].forEach(player => {
                            display.setPixel(player.position, player.playerColor);
                        });

                        this.gameState = "PRICING";

                    } else {
                        this.gameState = "SCORE";
                    }
                }
            
                break;

            // Game is over. Show winner and clean everything up so we can start a new game.
            case "SCORE":
                console.log("playerOne.score=", playerOne.score);
                console.log("playerTwo.score=", playerTwo.score);

                if (playerOne.score > playerTwo.score) {
                    score.winner = playerOne.playerColor
                } else if (playerOne.score < playerTwo.score) {
                    score.winner = playerTwo.playerColor
                } else {
                    score.winner = color(128,128,128)  // draw
                }
            
                //light up w/ winner color by populating all pixels in buffer with their color
                display.setAllPixels(score.winner);

                break;

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}




// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    gameStarted = 1;

    // And so on...
    if (key == 'D' || key == 'd') {
        playerOne.move(1);
        playerOne.changeBid(+10)

    }

    if (key == 'J' || key == 'j') {
        playerTwo.move(-1);
        playerTwo.changeBid(+10)
    }


    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
        // Reset game state
        controller.gameState = "PRICING";
        countdown = 5; // Reset countdown to 5 seconds
        round = 1; // Reset to the first round
        gameStarted = 0; // Reset game started flag

        // Reset players
        [playerOne, playerTwo].forEach(player => {
            player.score = 0; // Reset score
            player.budget = budget; // Reset budget to initial value or whatever your game design is
            player.currentBudget = budget; // Reset currentBudget to the full budget

            player.currentBid = 0; // Reset current bid
            player.position = player === playerOne ? 0 : displaySize - 1; // Reset positions
            // Reset any other player properties as necessary
        });


        // Optionally clear the display and redraw initial game state
        display.clear();
        [playerOne, playerTwo].forEach(player => {
            display.setPixel(player.position, player.playerColor);
        });
    }
    if (countdown < 5) {
        countdown = 5; // Reset countdown to 5 seconds
    }
}