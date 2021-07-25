var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let theta;
let r;
let numPetals;
let size;
let points = [];

function setup() {
  document.getElementById('Petals').onchange = function(){
    numPetals = this.value;
    points = [];
    theta = -2 * PI;
  }
  var canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  theta = -2 * PI;
  numPetals = 3;
  size = width / 5;
  noFill()
  colorMode(HSB);
  stroke(120, 255, 255);
}

function draw() {
  background(0);
  for (let i = 0; i < 10; ++i) {
    if (theta < 2 * PI || 0) {
      let r = size * cos(numPetals * theta);
      let x = r * cos(theta);
      let y = r * sin(theta);
      points.push({
        x: x,
        y: y
      });
      theta += 0.005;
    }
  }


  push();
  translate(width / 2, height / 2);
  beginShape();
  for (let point of points) {
    // stroke(point.x, 255, 255);
    vertex(point.x, point.y);
  }
  endShape();
  pop();

}
