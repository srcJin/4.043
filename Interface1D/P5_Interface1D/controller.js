
// This is where your state machines and game logic lives

let displaySize = 50;   // how many pixels are visible in the game

class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "PLAY";

    }



    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////

        function initialize() {

        }

        switch (this.gameState) {


            // This is the main game state, where the playing actually happens
            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();

                // show all players in the right place, by adding them to display buffer
                display.setPixel(playerOne.position, playerOne.playerColor);
                display.setPixel(playerTwo.position, playerTwo.playerColor);

                if (gameStarted == 1) {
                    // Update and display the countdown every second
                    if (frameCount % 60 == 0 && countdown > 0) { // Checks if a second has passed
                        countdown -= 1; // Decrements the countdown by 1 every second
                    }
                }


                if (countdown == 0) {

                    if (round < 3) {

                        // calculate budget and score
                        playerOne.budget -= playerOne.currentBid
                        playerTwo.budget -= playerTwo.currentBid
                        playerOne.currentBid = 0; // Reset the bid for the new round.
                        playerTwo.currentBid = 0; // Reset the bid for the new round.
                        playerOne.currentBudget = playerOne.budget; // Set the currentBudget for the next round based on remaining budget.
                        playerTwo.currentBudget = playerTwo.budget;

                        // reset the game
                        round += 1;  // back to play state
                        // @todo reset countdown
                        countdown = 5;
                        display.clear();
                        // display.setAllPixels(roundColors[round-1]) // change the color for each rounds

                        playerOne.position = 0
                        playerTwo.position = displaySize - 1

                        // console.log("playerOne.position",playerOne.position)
                        // console.log("playerTwo.position",playerTwo.position)


                        display.setPixel(playerOne.position, playerOne.playerColor);
                        display.setPixel(playerTwo.position, playerTwo.playerColor);

                        // update the score
                        playerOne.updateScore();
                        playerTwo.updateScore();

                    }
                    else {
                        this.gameState = "SCORE"
                    }
                }

                break;

            // This state is used to play an animation, after a target has been caught by a player 
            // case "COLLISION":

            //     // clear screen at frame rate so we always start fresh      
            //     display.clear();

            //     // play explosion animation one frame at a time.
            //     // first figure out what frame to show
            //     let frameToShow = collisionAnimation.currentFrame();    // this grabs number of current frame and increments it 

            //     // then grab every pixel of frame and put it into the display buffer
            //     for (let i = 0; i < collisionAnimation.pixels; i++) {
            //         display.setPixel(i, collisionAnimation.animation[frameToShow][i]);
            //     }

            //     //check if animation is done and we should move on to another state
            //     if (frameToShow == collisionAnimation.animation.length - 1) {

            //         // We've hit score max, this player wins
            //         if (playerOne.score >= score.max) {
            //             score.winner = playerOne.playerColor;   // store winning color in score.winner
            //             this.gameState = "SCORE";               // go to state that displays score

            //             // We've hit score max, this player wins
            //         } else if (playerTwo.score >= score.max) {
            //             score.winner = playerTwo.playerColor;   // store winning color in score.winner
            //             this.gameState = "SCORE";               // go to state that displays score

            //             // We haven't hit the max score yet, keep playing    
            //         } else {
            //             target.position = parseInt(random(0, displaySize));  // move the target to a new random position
            //             this.gameState = "PLAY";    // back to play state
            //         }
            //     }

            //     break;



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

                // reset everyone's score
                // playerOne.score = 0;
                // playerTwo.score = 0;

                // put the target somewhere else, so we don't restart the game with player and target in the same place
                // target.position = parseInt(random(1,displaySize));

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
    // Move player one to the left if letter A is pressed
    if (key == 'A' || key == 'a') {
        playerOne.move(-1);
        playerOne.changeBid(-10)
    }

    // And so on...
    if (key == 'D' || key == 'd') {
        playerOne.move(1);
        playerOne.changeBid(+10)

    }

    if (key == 'J' || key == 'j') {
        playerTwo.move(-1);
        playerTwo.changeBid(+10)
    }

    if (key == 'L' || key == 'l') {
        playerTwo.move(1);
        playerTwo.changeBid(-10)

    }

    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
        controller.gameState = "PLAY";
    }

    if (countdown < 5) {
        countdown = 5; // Reset countdown to 5 seconds
    }
}