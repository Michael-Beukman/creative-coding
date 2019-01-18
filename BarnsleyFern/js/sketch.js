var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;

let curr;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  reset();
}

function draw() {
  translate(width / 2, height/2);
  stroke(34, 139, 34)
  fill(34, 139, 34)
  strokeWeight(0.1)
  for (let i = 0; i < 1000; ++i) {
    // let x = map(curr.x, -3, 3, -width / 4, width / 4);
    // let y = map(curr.y, -3, 3, height / 4, -height / 4);
    let x = map(curr.x, -2.1820, 2.6558, -width / 4, width / 4);
    let y = map(curr.y, 0, 9.9983, height/4, -height / 4);
    point(x, y);
    // point(curr.x, -curr.y);
    let r = random();
    let choice;
    if (r < 0.01) {
      choice = 0;
    } else if (r < 0.86) {
      choice = 1;
    } else if (r < 0.93) {
      choice = 2;
    } else choice = 3;
    curr = transform(choice, curr);
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
  curr = createVector(0, 0);
  background(0);
}

function transform(i, p) {
  let scale = 1;
  let a, b, c, d, e, f;
  p.div(scale);
  switch (i) {
    case 0:
      a = b = c = 0;
      e = 0.16;
      d = f = 0;
      // p.x = 0;
      // p.y = 0.16 * p.y;
      break;
    case 1:
      a = 0.85;
      b = 0.04;
      c = 0;
      d = -0.04;
      e = 0.85;
      f = 1.6;

      // p.x = 0.85 * p.x + 0.04 * p.y;
      // p.y = -0.04 * p.x + 0.85 * p.y + 1.6;
      break;
    case 2:
      a = 0.2;
      b = -0.26;
      c = 0;
      d = 0.23;
      e = 0.22;
      f = 1.6;
      // p.x = 0.2 * p.x - 0.26 * p.y;
      // p.y = 0.23 * p.x + 0.22 * p.y + 1.6;
      break;
    case 3:
      a = -0.15;
      b = 0.28;
      c = 0;
      d = 0.26;
      e = 0.24;
      f = 0.44;

      // p.x = -0.15 * p.x + 0.28 * p.y;
      // p.y = 0.26 * p.x + 0.24 * p.y + 0.44;
      break;
  }
  let x = p.x * a + p.y * b + c;
  let y = p.x * d + p.y * e + f;
  p.x = x;
  p.y = y;
  // return p
  return p.mult(scale);
}
