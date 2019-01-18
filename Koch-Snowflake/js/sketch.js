var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let lines = [];
let curr;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  reset();
}

function mousePressed(){
  let newL = [];
  for (let l of lines){
    newL = newL.concat(l.spawn(lines.length == 3));
  }
  lines = newL;
}

function draw() {
  translate(width/4,0);
  background(0);
  for (let i=lines.length -1; i>=0 ;--i){
    stroke(255);
    lines[i].draw();
    
  }
}
function reset() {
  background(0);
  
  let w = width/4;
  let h = 2.5*height/4;
  let l1 = new Line(0,h, w*2,h);
  let l2 = new Line(0,h, w, h - 2*w * sin(PI/3), 1);
  let l3 = new Line(w*2,h, w, h - 2*w * sin(PI/3));
  lines.push(l1);
  lines.push(l2);
  lines.push(l3);
}
