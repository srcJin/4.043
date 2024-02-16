
// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.


class Player {

    constructor(_color, _position, _displaySize, _role, _budget) {
        this.playerColor = _color;
        this.position = _position;
        this.score = 0;
        this.displaySize = _displaySize;
        this.currentBid = 0;
        this.role = _role;
        this.budget = _budget;
        this.currentBudget = _budget;
    }



    // Move player based on keyboard input
    move(_direction) {
        const moveCost = 10; // Define move cost.
    
        // Calculate the new position based on the direction of movement.
        let newPosition = this.position + _direction;
    
        // Determine the movement boundaries for the player based on their role.
        let minPosition, maxPosition;
        if (this.role === "leftPlayer") {
            minPosition = 0;
            maxPosition = Math.floor(this.displaySize / 2) - 1; // Left player's maximum position.
        } else if (this.role === "rightPlayer") {
            minPosition = Math.ceil(this.displaySize / 2);
            maxPosition = this.displaySize - 1; // Right player's maximum position.
        }
    
        // Check if the new position is within the player's allowed half of the display.
        if (newPosition >= minPosition && newPosition <= maxPosition) {
            // Check if there's enough budget to move.
            if (this.currentBudget >= moveCost) {
                // Update position if within bounds and deduct move cost from the current budget.
                this.position = newPosition;
                this.currentBudget -= moveCost;
            } else {
                // Optional: Provide feedback to the player about insufficient budget.
            }
        } else {
            // Optional: Provide feedback to the player about hitting movement boundaries.
        }
    }

    changeBid(value) {
        let newBid = this.currentBid + value;

        // Ensure the new bid is within the budget and the specified bounds
        if (newBid < 0) {
            newBid = 0;
        } else if (newBid > 250) {
            newBid = 250;
        } else if (newBid > this.budget) {
            // Prevent bid from exceeding player's budget
            newBid = this.budget;
        }

        this.currentBid = newBid;
    }


    // Method to calculate and update the player's score
    updateScore() {
        // Define scoring criteria
        const bidPoints = 10; // Points per unit bid
        const budgetMultiplier = 0.1; // Multiplier for remaining budget to convert to points

        // Calculate points from bids
        let bidScore = this.currentBid * bidPoints;

        // Calculate points from remaining budget
        let budgetScore = this.currentBudget * budgetMultiplier;

        // Update the player's score
        // Here you can adjust the formula to fit your game's scoring logic
        this.score += bidScore + budgetScore;

        // Reset currentBid and currentBudget if needed
        // Note: You might want to reset these elsewhere depending on your game flow
        this.currentBid = 0;
        this.currentBudget = this.budget; // Reset or adjust based on game logic
        }
}


class Item {
    constructor(_color, value) {
        this.itemColor = _color;
        this.value = 0;
    }
}
