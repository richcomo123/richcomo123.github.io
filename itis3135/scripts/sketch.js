let isDrawing = false;

function setup() {
  createCanvas(800, 400);
  background(255);
}

function draw() {
  if (isDrawing) {
    stroke(0);
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed() {
  isDrawing = true;
}

function mouseReleased() {
  isDrawing = false;
}

function keyPressed() {
  // Clear the canvas when the user presses the 'c' key
  if (key === 'c' || key === 'C') {
    background(255);
  }
}
