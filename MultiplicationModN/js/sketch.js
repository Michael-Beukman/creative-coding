var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
w = Math.min(w, h);
h = Math.min(w, h);
let n = 225;
function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  
  textSize(40);
}

function draw() {
  background(0);
  const xW = w/(n-1);
  const yH = h/(n-1);
  stroke(255);
  const to = color(255, 0, 0);
  const from = color(0, 0, 255);
  for (let i=1; i<n; ++i){
    for (let j=1; j<n; ++j){
      const num = j * i % n;
      let col;

      if (num === 0) col = [255, 255,255];
      // else if (num < n/2) col = [map(num, 1, n/2,150, 255), 0, 0];
      // else col = [0, 0, map(num, 1, n/2,150, 255)];
      else {
        col  = lerpColor(from, to, map(num, 1, n-1, 0, 1));
      }
      fill(col);
      // console.log(col);
      // line(xW * i, 0, xW * i, height);
      // text(str, x, y, x2, y2)
      rect(xW * (i-1), yH*(j-1), xW, yH);
      fill(0)
      stroke(0);
      // console.log(xW * (1-1), yH * (1-1));
      const x = xW * (i-1) + 0.75*xW/2;
      const y = yH * (j-1) + 0.75*yH/2;
      // text(num, x, y, x, y);
      text(num, (xW)*(i-1) + 0.8*xW/2, (yH) * (j-1) + yH/3, (xW)*(i-1) + 0.8*xW/2, (yH) * (j-1) + yH/2);
      // return;
    }
  }
  noLoop();
}
