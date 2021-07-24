var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let points;
let colors;
let tracepoint;
let percent;
let prevVertex;
let numPoints;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  reset();
}

function draw() {
  for (let i = 0; i < 1000; ++i) {
    point(tracepoint.x, tracepoint.y);
    let index = floor(random(points.length));
    let randPoint = points[index];
    // if (randPoint === prevVertex) continue;
    let col = colors[index];
    stroke(col);
    let halfway = getHalfway(tracepoint, randPoint);
    tracepoint = halfway;
    prevVertex = randPoint;
  }
}

function getHalfway(a, b) {
  //   return p5.Vector.add(a, b).mult(percent);
  const x = lerp(a.x, b.x, percent);
  const y = lerp(a.y, b.y, percent);
  return createVector(x, y);
}

function resetValues({ perc, nPoints }, res = true) {
  percent = perc;
  numPoints = nPoints;
  if (res) {
    reset();
  }
}

function reset() {
  points = [];
  colors = [];
  let radius = width / 4;
  let center = createVector(width / 2, height / 2);
  let dA = TWO_PI / numPoints;
  for (let i = 0; i < numPoints; ++i) {
    let angle = i * dA;
    let v = p5.Vector.fromAngle(angle);
    v.setMag(radius);
    v.add(center);
    points.push(v);
    colors.push(
      color(round(random(255)), round(random(255)), round(random(255)))
    );
  }
  background(0);
  stroke(255);
  tracepoint = createVector(random(width), random(height));
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y);
  }
  strokeWeight(1);
  prevVertex = tracepoint;
}
