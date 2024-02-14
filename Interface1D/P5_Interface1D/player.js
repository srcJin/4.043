
// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.


class Player {
  
    constructor(_color, _position, _displaySize, _role) {
        this.playerColor = _color;
        this.position = _position;
        this.score = 0;
        this.displaySize = _displaySize;
        this.currentBid = 0;
        this.role = _role;
    }



    // Move player based on keyboard input
    move(_direction) {

        // Temporary variable to hold the new position
        let newPosition = this.position + _direction;

        // Determine the movement boundaries for the player based on their role
        let minPosition, maxPosition;
        if (this.role === "leftPlayer") {
            minPosition = 0;
            maxPosition = Math.floor(this.displaySize / 2) - 1; // Left player's maximum position
        } else if (this.role === "rightPlayer") {
            minPosition = Math.ceil(this.displaySize / 2);
            maxPosition = this.displaySize - 1; // Right player's maximum position
        }

        // Check if the new position is within the player's allowed half of the display
        if (newPosition >= minPosition && newPosition <= maxPosition) {
            this.position = newPosition; // Update position if within bounds
        }
         
    } 
  }


class Item {
    constructor(_color, value) {
        this.itemColor = _color;
        this.value = 0;
    }
}
