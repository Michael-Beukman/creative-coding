var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let minX = -0.5;
let maxX = 0.5;
let minY = -0.5;
let maxY = 0.5;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
}

function fact(n) {
  if (n == 0) return 1;
  return n * fact(n - 1);
}
function bessel(n = 10) {
  return (x) => {
    let ans = 0;
    for (let i = 0; i <= n; ++i) {
      ans += (pow(-1, i) * pow(x, 2 * i)) / pow(2, 2 * i) / pow(fact(i), 2);
    }
    return ans;
  };
}

function sinExp() {}

function def(){
    vals = {};
    for (let x = minX; x <= maxX; x += 0.1) {
      for (let y = minY; y <= maxY; y += 0.1) {
        let ans = meep(x, y);
        if (!vals[ans]) vals[ans] = [];
        vals[ans].push({ x, y });
      }
    }
}

function contour() {
  vals = {};
  for (let x = minX; x <= maxX; x += 0.1) {
    for (let y = minY; y <= maxY; y += 0.1) {
      let ans = meep(x, y);
      if (!vals[ans]) vals[ans] = [];
      vals[ans].push({ x, y });
    }
  }
  let prevZ = -1000;
  let allKeys = Object.keys(vals).map((x) => parseFloat(x)).sort((a, b) => a - b);
  
  for (let k of allKeys) {
    // console.log("ree ", k, prevZ);
    if (abs(prevZ - k) > 0.0000001) {
      prevZ = k;
      beginShape();
      print(vals[k]);
      for (let { x, y } of vals[k]) {
        // console.log("ree ", x, y, k, vals[k]);
        vertex(scaleX(x), scaleY(y));
        ellipse(scaleX(x), scaleY(y),1)
        // ellipse(scaleX(4), scaleY(4), 10);
      }
      endShape()
    }
  }
  console.log(allKeys);
  console.log(vals);
}

function meep(x, y) {
  return x * x + y * y;
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  stroke(255);
  axis();
  stroke(255, 0, 0);
  noFill();
  //   drawFunc(x=>x*x - 2, 0.01);
  drawFunc(bessel(100), 0.01);
//   contour();
  noLoop();
}

function axis() {
  line(scaleX(minX), 0, scaleX(maxX), 0);
  line(0, scaleX(minX), 0, scaleX(maxX));
}

function drawFunc(f, dx = 0.25) {
  beginShape();
  for (let x = minX; x <= maxX; x += dx) {
    vertex(scaleX(x), scaleY(f(x)));
  }
  endShape();
}

function scaleX(x) {
  return (x / (maxX - minX)) * width;
}

function scaleY(y) {
  return (-y / (maxY - minY)) * height;
}
