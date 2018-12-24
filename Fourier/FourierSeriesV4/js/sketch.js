var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let time = 0;
let speed = 0.02;
let wave = [];
let maxN;
let func = 'square'
let numWaves = 3;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
}

function draw() {
    background(0);
    time += speed;
    translate(200, height / 2);

    circleWithLineChoose();

    drawWaves();
}

function drawWaves() {
    stroke(255);
    push();

    translate(200, 0);
    noFill();
    beginShape();
    for (let i = 0; i < wave.length; ++i) {
        vertex(i, wave[i]);
    }
    endShape();
    line()
    pop();
    if (wave.length > width) {
        wave.pop();
    }
}



function getR(r, n){
    if (func ==='square'){
        return r * (4 / (n * PI));
    }else if (func ==='sawtooth'){
        return r * (2/(n*PI * pow(-1, n)));
    }
}

function circleWithLineChoose(){
    if (func==='square'){
        circleWithLine(2, maxN, 100);
    }else if (func==='sawtooth'){
        circleWithLine(1, maxN, 100);
    }
}

function circleWithLine(nIncrement, maxN=100, rStart){
    let x = 0;
    let y = 0;
    let prevX = x;
    let prevY = y;
    for (let n = 1; n <= maxN; n += nIncrement) {
        const r = getR(rStart, n)
        noFill();
        stroke(255, 100)
        ellipse(x, y, 2 * r);
        fill(255)
        x += r * cos(n * time);
        y += r * sin(n * time);
        stroke(255)
        line(prevX, prevY, x, y)
        prevX = x;
        prevY = y;
    }
    stroke(255,0,0)
    line(x, y, 200, wave[0]);
    wave.unshift(y);
}

function resetValues({_speed, numberOfWaves, whichFunction}) {
    speed = _speed;
    maxN = numberOfWaves;
    func = whichFunction;
    console.log(speed, maxN,)
 }