var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let agent;
function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  agent = new Agent(width/2, height/2);
  // agent.v.add(createVector(1, 2));
}



function draw() {
  background(0);
  agent.steer(createVector(mouseX, mouseY));
  agent.update();
  agent.draw();
}