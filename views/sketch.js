var changes = [2, 3, 5, -2, -3, -4, -5];
var diameter;
var popSound;
var bubbles = [];
var state = 0;

function setup() {
  noStroke();
  noLoop();
}

function draw() {
  if(state == 0) {
    createCanvas(windowWidth, windowHeight);
    background(173, 216, 230);
    bubbles = []

    textSize(18);
    textFont("Lucidia Bright");
    text("Click for bubbles :)",
      windowWidth / 2 - 70 ,
      windowHeight / 2);
  }
  else {
    popSound = loadSound("https://nguyenshana.github.io/bubblez/pop.m4a");
    createCanvas(windowWidth, windowHeight);
    background(173, 216, 230);
    bubbles = []

    for (var i = windowWidth/4; i < 3*windowWidth/4 - 20; i = i + 35) {
      for (var j = windowHeight/4; j < 3*windowHeight/4 - 45; j = j + 35) {
        append(bubbles, new Bubble(i, j, 25));
      }
  }
  }

  // textSize(18);
  // textFont("Lucidia Bright   b");
  // text("Click to refill the bubbles :)",
  //   windowWidth / 2 - 100,
  //   windowHeight - 15);

}

function windowResized() {
  draw()
}

function mousePressed() {
  // for(var count = 0; count < bubbles.length; count++) {
  //   if (bubbles[count].contains() &&
  //     !bubbles[count].getState()) {
  //     bubbles[count].drawPressedBubble();
  //     bubbles[count].setState(true);
  //   }
  // }
  if(state === 0) {
    state += 1;
  }
  draw();
  
}

function mouseMoved() {
  for (var c = 0; c < bubbles.length; c++) {
    // old code: if (bubbles[c].getState()) {
    if (bubbles[c].contains()) {
      bubbles[c].drawPoppedBubble();
      bubbles.splice(c, 1);
    }
  }

}

// Taken from p5 
// https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}




class Bubble {

  constructor(xCoor, yCoor, diameter) {
    this.diameter = diameter;
    this.state = false // not popped
    this.x = xCoor;
    this.y = yCoor;
    this.i = -1;

    this.drawBubble();
  }


  contains() {
    var leftBound = this.x - this.diameter / 2;
    var rightBound = this.x + this.diameter / 2;
    var topBound = this.y - this.diameter / 2;
    var bottomBound = this.y + this.diameter / 2;
    if (mouseX > leftBound && mouseX < rightBound &&
      mouseY > topBound && mouseY < bottomBound) {
      return true
    } else {
      return false;
    }
  }

  
  getState() {
    return this.state;
  }

  
  setState(newState) {
    this.state = newState;
  }

  
  drawBubble() {
    circle(this.x, this.y, this.diameter);
  }

  
  drawPressedBubble() {
    circle(this.x, this.y, this.diameter);

    push();
    fill(240);
    circle(this.x, this.y, this.diameter / 2);
    pop();
  }

  
  drawPoppedBubble() {
    push();
    fill(173, 216, 230);
    rect(this.x - this.diameter / 2,
      this.y - this.diameter / 2,
      this.diameter, this.diameter);
    pop();

    popSound.play();

    star((this.x) - 4,
      (this.y) - 4,
      this.diameter / 5,
      this.diameter / 15, 5);
    star((this.x) + 4,
      (this.y) + 4,
      this.diameter / 5,
      this.diameter / 15, 5);

    diameter = this.diameter;

    this.animate();
  }

  
  animate() {
    this.i = this.i + 1;

    push();
    fill(173, 216, 230);
    rect(this.x - 15,
      this.y - 15,
      this.diameter + 10,
      this.diameter + 10);
    pop();

    if (this.i >= 6) {
      this.cleared = true;
      this.i = -1;
      return;
    }


    if (changes[this.i] > 0) {
      star((this.x) - changes[this.i],
        (this.y) - changes[this.i],
        this.diameter / 5,
        this.diameter / 15, 5);
      star((this.x) + changes[this.i],
        (this.y) - changes[this.i],
        this.diameter / 5,
        this.diameter / 15, 5);
    } else {
      star((this.x - 4) + changes[this.i],
        (this.y - 2) - changes[this.i],
        this.diameter / 5,
        this.diameter / 15, 5);
      star((this.x + 4) - changes[this.i],
        (this.y) - changes[this.i],
        this.diameter / 5,
        this.diameter / 15, 5);

    }

    setTimeout(function() {
      this.animate()
    }.bind(this), 100);

  }  


}
