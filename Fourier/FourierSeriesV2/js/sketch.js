var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let theta = 0;
let period = 500;
let amplitude = 100;
let xSpacing = 5;
let dx;
let ys;
let numWaves;
let yOffset;
let xOffset = 0;
let angularSpeed;
let circlesOrLines;
let func;
let L;


function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    ys = new Array(floor(width / xSpacing));
    dx = TWO_PI / period * xSpacing;
    yOffset = 0;
    L = 5;
}

function draw() {
    background(0);
    getWave();
    renderWave();
    theta += angularSpeed;
}

function getWave() {
    let x = theta;
    for (let i = 0; i < ys.length; ++i) {
        ys[i] = (getX(x)) - yOffset;
        x += dx;
    }
}

function renderWave() {
    beginShape();
    noFill();
    stroke(255);
    for (let x = 0; x < ys.length; ++x) {
        if (circlesOrLines === 'circle')
            ellipse(xOffset + x * xSpacing, height / 2 + ys[x], xSpacing, xSpacing);
        else
            vertex(xOffset + x * xSpacing, height / 2 + ys[x]);
    }
    endShape();
}

function getX(x) {
    switch (func) {
        case 'square':
            return getSquare(x);
        case 'triangle':
            return getTriangle(x);
        case 'sawtooth':
            return getSawtooth(x);
        default:
            return getSquare(x);
    }
}

function circle(x, y, r) {
    ellipse(x, y, r, r);
}

function resetValues({ cirOrLines, whichFunction, speed, numberOfWaves }) {
    numWaves = numberOfWaves;
    angularSpeed = speed;
    circlesOrLines = cirOrLines;
    func = whichFunction;
}

function getSawtooth(x) {
    let ans = 0;
    for (let n = 1; n <= numWaves; n++) {
        ans += 1 / n * sin(n * PI * x / L);
    }
    return amplitude * (0.5 - 1 / (PI) * ans);
}

function getSquare(x) {
    let ans = 0;
    for (let n = 1; n <= numWaves; n += 2) {
        ans += 1 / n * sin(n * PI * x / L);
    }

    return amplitude * 4 / (PI) * ans;
}

function getTriangle(x) {
    let ans = 0;
    for (let n = 1; n <= numWaves; n += 2) {
        ans += 1 / (n * n) * sin(PI * n * x / L) * pow(-1, (n - 1) / 2);
    }

    return amplitude * 8 / (PI * PI) * ans;
}

function drawCircleWaves(depth = 0, x = 100, y = height / 2, r = 100) {
    if (depth>=7) return
    if (depth != 0)circle(x + cos(theta)*r/4, y + sin(theta) * r/4, r);
    else{
        circle(x+r/4 ,y+r/4, r);
    }
    drawCircleWaves(depth+1, x,y,r/2);
    // circle(100, height / 2, 100, 100);
    // const xP = 100 + cos(theta) * 25;
    // const y = height / 2 + sin(theta) * 25;
    // circle(xP, y, 50, 50);
}