var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let balls;
let selectedBall = null;
let deltaTime = 0.1;
let prevTime = 0;

let mode = false;

function setup() {
  let canvas = createCanvas(w, h);
  
  canvas.parent(cDiv);
  balls = new Balls();
  const btn = createButton("Select");
  btn.mousePressed(function(){
      console.log("clicked")
      mode = !mode;
      btn.html(!mode ? "Select" : "Shoot");
    //   btn.html("RERER") //btn.attribute("value");
  })

}

function draw() {
  deltaTime = (millis() - prevTime)/1000;
  background(0);
  stroke(255);
  translate(width / 2, height / 2);
  balls.update();
  balls.draw();
  // line(0,0,width,height);

  if (mouseIsPressed && mode && selectedBall!=null){
      strokeWeight(3);
    stroke(0,0,255);
    console.log('ee', selectedBall.pos.x, selectedBall.pos.y, mouseX - width/2, mouseY - height/2)
    line(selectedBall.pos.x, selectedBall.pos.y, mouseX - width/2, mouseY - height/2)
    strokeWeight(1);

}
  prevTime = millis();
}

function mousePressed() {

    const x = mouseX - width / 2,
      y = mouseY - height / 2;

    selectedBall = balls.getBallAtPos(createVector(x, y));
  
}
function mouseReleased(){
    if (mode == true && selectedBall!=null){
        // then shoot
        selectedBall.vel = p5.Vector.sub(selectedBall.pos, createVector(mouseX - width/2, mouseY - height/2));
        console.log(selectedBall.vel, deltaTime);
    }
    selectedBall = null
}

function mouseDragged(){
    if (selectedBall != null && mode == false) {
        selectedBall.pos = createVector(mouseX - width/2, mouseY - height/2);
    }else if (selectedBall != null && mode == true){
        
    }
}
