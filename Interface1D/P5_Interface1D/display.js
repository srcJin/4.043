// This is used to aggregrate visual information from all objects before we display them. 
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'


class Display {

    constructor(_displaySize, _pixelSize) {
  
      this.displaySize = _displaySize;
      this.pixelSize = _pixelSize;
      this.initColor = color(50, 50, 50);      // black color
      this.displayBuffer = [];

      // Assign black to all pixels. Black = off
      for(let i = 0; i < this.displaySize; i++){
        this.displayBuffer[i] = this.initColor;
      }
  
    }
  
     // Color a specific pixel in the buffer
    setPixel(  _index,  _color) {
        this.displayBuffer[_index]  = _color;
    }
  

    // Color all pixels in the buffer
    setAllPixels( _color) {
      
      for(let i = 0; i < displaySize; i++) { 
        display.setPixel(i, _color); 
      }
    }


    // Now write it to screen
    // This is the only function in the entire software that writes something directly to the screen. I recommend you keep it this way.
    show() {
      const centerX = width / 2;  // Assuming 'width' is the width of your canvas
      const centerY = height / 2; // Assuming 'height' is the height of your canvas
      const radius = 200; // The radius of the circle you want to arrange your circles around
      
      for (let i = 0; i < this.displaySize; i++) {
        // Calculate the angle for this element
        let angle = TWO_PI / this.displaySize * i;
        
        // Calculate the x and y position
        let x = centerX + radius * cos(angle);
        let y = centerY + radius * sin(angle);
        
        // Draw the circle
        //noStroke();
        fill(this.displayBuffer[i]);
        circle(x, y, this.pixelSize);
      }
    }

    
    // Let's empty the display before we start adding things to it again
    clear() {

        for(let i = 0; i < this.displaySize; i++) {    
        this.displayBuffer[i] = this.initColor; 
        }
    }
    

  }