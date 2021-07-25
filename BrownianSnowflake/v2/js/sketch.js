/// <reference path="../p5.d/p5.global-mode.d.ts" />
var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let snowflake = [];
let currPoint;
let angle = 0;
let speed = 0.02;
function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  currPoint = new Particle(width / 2, 0);
}

function draw() {
  noFill();
  stroke(255);
  background(0);
  translate(width / 2, height / 2);
  rotate(PI / 6);
  //   rotate(angle);
  angle += speed;
  if (angle >= TWO_PI) speed *= -1;
  let counter = 0;
//   let from = color(0, 0, 255);
//   let to = color(0, 255, 0);
//   stroke(lerpColor(from, to, map(angle, 0, TWO_PI, 0, 1)));
  while (!currPoint.finished() && !currPoint.intersects(snowflake)) {
    currPoint.update();
    ++counter;
  }

  for (let i = 0; i < 6; ++i) {
    rotate(PI / 3);
    push();
    // stroke(255, 0, 0);
    currPoint.show();
    // stroke(0, 255, 0);
    show();
    scale(1, -1);
    show();
    // stroke(255, 0, 0);
    currPoint.show();
    pop();
  }
  if (currPoint.finished() || currPoint.intersects(snowflake)) {
    if (
      !(currPoint.x >= width / 2) &&
      !(currPoint.y >= height / 2) &&
      counter > 10
    ) {
      snowflake.push(currPoint);
      currPoint = new Particle(width / 2 + random(-10, 10), random(10));
    }
  }
}

function show() {
  for (let p of snowflake) {
    p.show();
  }
}
