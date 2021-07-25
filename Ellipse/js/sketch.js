var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let a = 3000;
let b = 36000;

let angle = 0;
let xDot=0, yDot=0;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
}

function draw() {
    background(0);
    stroke(255)
    translate(width/2, height/2);
    noFill();
    drawAxes();
    drawEllipse()

    drawAngles();

    drawTangent();

    const allDists = []
    // do Stuff()
    for (let angle=0; angle < TWO_PI; angle+=0.01){
        xDot = cos(angle) * sqrt(a);
        yDot = sin(angle) * sqrt(b);
        const Q = (a*pow(yDot,2) + pow(xDot, 2) * b)/(a*yDot);
    
        // x axis
        const P = (a*pow(yDot,2) + pow(xDot, 2) * b)/(b*xDot);
    
        let dist = sqrt(Q*Q + P*P);
        if (dist == Infinity) dist = -1;
        allDists.push(dist);
    }

    // draw dists
    background(0);
    const maxDist = allDists.reduce((x,y) => max(x,y), 0);
    const minDist = allDists.filter(x=>x>0).reduce((x,y) => min(x,y), 10000000);
    console.log(minDist, minDist*minDist)
    console.log(allDists, maxDist)
    for (let i in allDists){
        const x = width/allDists.length * i -width/2;
        const y = allDists[i] / maxDist * height/2 * 0.9;
        // console.log(y)
        ellipse(x, -y, 10);
    }
    noLoop();
}


function drawEllipse(){
    // diameter is 2 * sqrt(a)
    ellipse(0,0,2*sqrt(a),2*sqrt(b))
    ellipse(sqrt(a), 0, 10)
    ellipse(0,sqrt(b), 10)
    // ellipse
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

function drawAngles(){
    xDot = cos(angle) * sqrt(a);
    yDot = sin(angle) * sqrt(b);
    noStroke();
    fill(255, 140, 140);
    ellipse(xDot, yDot, 10)
    noFill();
    stroke(255)
}

function drawTangent(){
    const r = 100;
    const startX = xDot + r * a * yDot;
    const startY = xDot - r * b * xDot;
    
    const endX = xDot - r * a * yDot;
    const endY = xDot + r * b * xDot;
    // console.log({startX, startY, endX, endY})
    // line(startX, startY, endX, endY)
    line(startX, startY, xDot, yDot)
    line(endX, endY, xDot, yDot);


    // now calculate where it hits the axes

    fill(255,0,0)
    // y axis
    const Q = (a*pow(yDot,2) + pow(xDot, 2) * b)/(a*yDot);
    ellipse(0,Q, 10)

    // x axis
    const P = (a*pow(yDot,2) + pow(xDot, 2) * b)/(b*xDot);
    ellipse(P, 0, 10)
    noFill();

    const dist = sqrt(Q*Q + P*P);
    text(dist, -width/2+100, -height/2+100,300,300)
    text("A + B = " + (a+b)  , -width/2+400, -height/2+100,300,300)
    // ellipse(-width/2+100, -height/2+100, 100)
}

function mouseMoved(){
    angle = createVector(mouseX-width/2, mouseY-height/2).heading();
}