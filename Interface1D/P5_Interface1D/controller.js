
// This is where your state machines and game logic lives

let displaySize = 50;   // how many pixels are visible in the game

let budget_countdown = 5

let pricing_countdown = 5

class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "WAITING";

    }



    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////


        switch (this.gameState) {

            case "WAITING":
                if (budgetStarted === 1) {
                    this.gameState = "BUDGET";
                    console.log("Transitioning to BUDGET STATE");

                }
                break;

            case "BUDGET":
                display.clear();

                console.log("BUDGET STATE");

                if (budget_countdown > 0) {
                    // Show the current bid by lighting up pixels from 0 to endPixel
                    if (frameCount % 60 < 30) { // This creates a blinking effect by toggling visibility


                        display.setPixelRange(0,displaySize/2, playerOne.playerColor);
                        display.setPixelRange(displaySize/2 ,displaySize-1, playerTwo.playerColor);
                    } else {
                        display.clear(); // Assuming there's a method to clear a range of pixels
                    }
            
                    if (frameCount % 60 == 0) {
                        // Update the countdown every second
                        budget_countdown -= 1;
                        console.log("pricing_countdown=", budget_countdown);
                    }

                } else {
                    this.gameState = "PRICING";
                }
            break;


            case "PRICING":
                display.clear();

                console.log("PRICING STATE");
                // Calculate the endpoint of the pixels to set based on the current bid
                // Calculate the sum of all item values
                let totalSum = itemValues.reduce((acc, curr) => acc + curr, 0);

                // Calculate the endPixel position for the current round's item value
                // Adjusted to fit within half of the display size
                let endPixel = parseInt((itemValues[round - 1] / totalSum) * (displaySize / 2));
            
                // Only update and blink when pricing_countdown is greater than 0
                if (pricing_countdown > 0) {
                    // Show the current bid by lighting up pixels from 0 to endPixel
                    if (frameCount % 60 < 30) { // This creates a blinking effect by toggling visibility
                        display.setPixelRange(0, endPixel, color(128, 128, 128));
                    } else {
                        display.clear(); // Assuming there's a method to clear a range of pixels
                    }
            
                    if (frameCount % 60 == 0) {
                        // Update the countdown every second
                        pricing_countdown -= 1;
                        console.log("pricing_countdown=", pricing_countdown);
                    }
                } else {
                    // When countdown reaches 0, ensure the final state is shown before switching
                    display.setPixelRange(0, endPixel, color(128, 128, 128));
                    // Transition to "PLAY" state
                    pricing_countdown = 5
                    this.gameState = "PLAY";
                }
                break;


            // This is the main game state, where the playing actually happens
            case "PLAY":
                // Clear screen at frame rate so we always start fresh      
                display.clear();
                console.log("PLAY STATE");
                // Show all players in the right place, by adding them to display buffer

                display.setPixelRange(0,playerOne.position, playerOne.playerColor);
                display.setPixelRange(playerTwo.position,displaySize-1, playerTwo.playerColor);

            
                // Update and display the countdown every second.
                if (gameStarted === 1 && frameCount % 60 === 0 && countdown > 0) {
                    countdown -= 1; // Decrement the countdown by 1 every second.
                }

                // Logic for when countdown is greater than or equal to 3.
                if (countdown >= 3) {
                    // Always show players without blinking.
                    display.setPixelRange(0, playerOne.position, playerOne.playerColor);
                    display.setPixelRange(playerTwo.position, displaySize - 1, playerTwo.playerColor);
                }

                // Logic for when countdown is less than 3 but greater than 0 for blinking effect.
                if (countdown < 3 && countdown > 0) {
                    // Blinking effect: Show players on for the first half of each second, then off.
                    if (frameCount % 60 < 30) { // On phase of the blink.
                        display.setPixelRange(0, playerOne.position, playerOne.playerColor);
                        display.setPixelRange(playerTwo.position, displaySize - 1, playerTwo.playerColor);
                    } else {
                        display.clear()
                    }
                    // The off phase is implicitly handled by clearing the display at the start of each frame.
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

                        display.setPixelRange(0,playerOne.position, playerOne.playerColor);
                        display.setPixelRange(playerTwo.position,displaySize-1, playerTwo.playerColor);
                        

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
    budgetStarted = 1;


    // And so on...
    if (key == 'D' || key == 'd') {
        gameStarted = 1;
        playerOne.move(1);
        playerOne.changeBid(+10)

    }

    if (key == 'J' || key == 'j') {
        gameStarted = 1;
        playerTwo.move(-1);
        playerTwo.changeBid(+10)
    }


    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
        // Reset game state
        controller.gameState = "WAITING";
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