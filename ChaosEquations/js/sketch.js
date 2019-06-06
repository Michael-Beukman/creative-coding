var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let speed = 0.0001;
let x = 1,
y = 1,
z=1;
const sigma=10,
beta = 8/3,
rho = 28;
const cols = [
  [255, 0, 0],
]
function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  background(0);
}

function getXY(x, y) {
  const newX = y + 1 - 1.4 * x*x;
  const newY = 0.3*x;
  const l = 1;//sqrt(newX * newX + newY*newY);
  return { x: newX/l, y: newY/l };
}

function draw() {
  for (let i=0; i<1000; ++i){
  const dx = sigma * (y - x);
  const dy = x * (rho - z) -y;
  const dz = x*y - beta*z; 

  x += dx * speed;
  y += dy * speed;
  z += dz * speed;
  stroke(map(z, 0, 100, 0, 255));
  // console.log(x * w/4, y * h/4);
  
  point(x*20+w/2, y*20+h/2);
  }
}
