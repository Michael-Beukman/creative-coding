var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let balls

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    balls = new Balls();
}

function draw() {
    background(0);
    stroke(255)
    translate(width/2, height/2);
    balls.update();
    balls.draw();
    // line(0,0,width,height);
}
