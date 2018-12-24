var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let theta = 0;
let period = 500;
let amplitude = 100;
let xSpacing = 16;
let dx;
let ys;
let numWaves;
let yOffset;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    ys = new Array(floor(width/xSpacing));
    dx  = TWO_PI / period * xSpacing;
    numWaves = floor(random(10));
    yOffset = 0;
}

function draw() {
    background(0);
    getWave();
    renderWave();
    // yOffset = (yOffset + 1) % floor(height-amplitude);
}

function getWave() {
    theta += 0.02;
    let x = theta;
    for (let i = 0; i < ys.length; ++i) {
        ys[i] = (getX(x)) - yOffset;
        x += dx;
    }
}

function renderWave(){
    beginShape();
    noFill(); //todo Looks legit without no fill
    stroke(255);
    for (let x=0; x<ys.length; ++x){
        ellipse(x * xSpacing, height/2 + ys[x], 16, 16);
        // vertex(x * xSpacing, height/2 + ys[x]);
    }
    endShape();
}

function getX(x){
    let ans = sin(x);
    for (let i=1; i<numWaves; ++i){
        ans += sin(x/PI/i);
    }
    // return (sin(x) + sin(x/PI) + sin(x/TWO_PI) + sin(x/PI/3)) * amplitude;
    return ans * amplitude;
}