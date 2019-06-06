let t;
let r;
let v;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.getElementById("canvasDiv"));
  r = 200;
  t=0;
  v=0.3;
}

function draw() {
  t += 0.001;
  translate(width / 2, height / 2);
  background(0);
  stroke(255);
  lines();
  v+= 0.00001;
}
function lines(){
  for (let i=0; i< 100; ++i){
    line(r * x1(t+i), r * y1(t+i), r * x2(t+i), r * y2(t+i));
    // console.log(r * x2(t+i), r * y2(t+i));
  }
}

function x1(t){
  return sin(t);
}

function y1(t){
  return cos(t);
}

function x2(t){
  // return t;
  return sin(t/v);
}

function y2(t){
  return cos(t/v);
}
