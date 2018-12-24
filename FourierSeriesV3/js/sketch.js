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
let xOffset = 500;
let angularSpeed;
let circlesOrLines;
let func;
let L;
let yTest = [];

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    ys = new Array(floor(width / xSpacing));
    dx = TWO_PI / period * xSpacing;
    yOffset = 0;
    L = 5;
    background(0)
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
        // continue;
        if (circlesOrLines === 'circle')
            ellipse(xOffset + x * xSpacing, height / 2 + ys[x], xSpacing, xSpacing);
        else
            vertex(xOffset + x * xSpacing, height / 2 + ys[x]);
    }
    endShape();
}

function getX(x) {
    // drawCircleWaves();
    // for (let p of yTest){
    //     ellipse(p[0], p[1], p[2], p[3]);
    // }
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
    let r = 200;
    let y = height / 2;
    let xP = xOffset;
    for (let n = 1; n <= numWaves; n += 2) {
        ans += 1 / n * sin(n * PI * x / L);
        circle(xP + cos(theta * n) * r / 2 * 0, y + 0 * sin(theta * n) * r / 2, r);
        line(xP, y, xP + r / 2 * cos(theta * n), y + r / 2 * sin(theta * n));
        if (n != numWaves) {
            xP = xP + r / 2 * cos(theta * n);
            y = y + r / 2 * sin(theta * n)
            r /= 2;
        }
    }
    line(xP + r / 2 * cos(theta * (numWaves)), y + r / 2 * sin(theta * (numWaves)), xP + r / 2 * cos(theta * (numWaves)) + 100, y + r / 2 * sin(theta * (numWaves)))
    return amplitude * 4 / (PI) * ans;
}

function getTriangle(x) {
    let ans = 0;
    for (let n = 1; n <= numWaves; n += 2) {
        ans += 1 / (n * n) * sin(PI * n * x / L) * pow(-1, (n - 1) / 2);
    }

    return amplitude * 8 / (PI * PI) * ans;
}

function drawCircleWaves(depth = 0, x = 100, y = height / 2, r = 200) {
    if (depth >= 3) return
    if (depth != 0) circle(x + cos(theta) * r / 2 * 0, y + 0 * sin(theta) * r / 2, r);
    else {
        circle(x, y, r);
    }
    drawCircleWaves(depth + 1, x + r / 2 * cos(theta * (depth + 1)), y + r / 2 * sin(theta * (depth + 1)), r / 2);
    line(x, y, x + r / 2 * cos(theta * (depth + 1)), y + r / 2 * sin(theta * (depth + 1)));

    if (depth == 2) {
        line(x + r / 2 * cos(theta * (depth + 1)), y + r / 2 * sin(theta * (depth + 1)), x + r / 2 * cos(theta * (depth + 1)) + 100, y + r / 2 * sin(theta * (depth + 1)))
        // ellipse(xOffset + abs(sin(theta)) * width , y + r / 2 * sin(theta * (depth + 1)), 10, 10);
    }

    // circle(100, height / 2, 100, 100);
    // const xP = 100 + cos(theta) * 25;
    // const y = height / 2 + sin(theta) * 25;
    // circle(xP, y, 50, 50);
}