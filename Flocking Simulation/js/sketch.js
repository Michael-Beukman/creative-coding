/// <reference path="../p5.d/p5.global-mode.d.ts" />
var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let flock = []

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    for (let i = 0; i < 200; ++i) {
        flock.push(new Boid())
    }
    angleMode(RADIANS);
}


function draw() {
    background(0);
    let copy = flock.slice();
    for (let b of copy) {
        b.doFlock(flock)
        b.update();
        b.show();
    }
    flock = copy;
}
