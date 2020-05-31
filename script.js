var dot;

setup = () => {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  dot = new Dot();
}

draw = () => {
  background(180);
  dot.move();
  dot.draw();
}

function Dot(radius) {
  this.radius = radius;

  this.draw = (position) => {
    stroke(200);
    strokeWeight(1);
    // fill('deepskyblue');
    fill('purple');
    ellipse(position.x, position.y, this.radius);
  }
}




function Horizontal() {
  this.pos = createVector(windowWidth / 2, windowHeight / 2)
  this.relativeBorder = 0.3
  this.speed = 15;
  this.radius = 60;  // maybe relative to screen size

  this.border = () => {
    return this.radius * 1.6;
  }

  this.move = () => {
    const border = this.border();
    if (this.pos.x >= windowWidth - border | this.pos.x <= border) {
      this.speed *= -1;
    }
    this.pos.x += this.speed;
  }

  this.draw = () => {
    stroke(200);
    strokeWeight(1);
    // fill('deepskyblue');
    fill('purple');
    ellipse(this.pos.x, this.pos.y, this.radius);
  }

}
