var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
const jump = 100;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
}

function draw() {
    background(0);
    translate(width/2, height/2);
    stroke(255);
    drawPoints();
    
}

function getVec(x, y){
    return sin(x);
}

function drawPoints(){
    for (let x = -width/2; x< width/2; x+=jump){
        // line(x, -height/2, x, height/2)
        for (let y=-height/2; y<height/2; y += jump){
            // line(-width/2, y, width/2, y);
            // ellipse(x, y, 10);
            const slope = getVec(x, y);
            const eps = 0.1// * jump;
            line(x, y, x+eps, y - eps*slope) ;
        }
    }
}