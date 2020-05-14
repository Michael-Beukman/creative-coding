var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let scaleX, scaleY;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);

}

function draw() {
    background(0);
    stroke(255);
    translate(width/2, height/2)
    drawAxes()
}


function drawAxes(){
    const gap = 100;
    line(-width/2, 0, width/2, 0)
    line(0, -height/2, 0, height/2);
    for (let x= 0; x<=width/2; x+=gap){
        line(x, -10, x,10)
        line(-x, -10, -x,10)
    }

    for (let y=0; y<=height/2; y+=gap){
        line(-10, y, 10, y)
        line(-10, -y, 10, -y)
    }
}
