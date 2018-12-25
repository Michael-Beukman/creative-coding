/// <reference path="../p5.d/p5.global-mode.d.ts" />
var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let minX;
let maxX;

let toothpicks = [];
function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    minX = -width/2;
    maxX = width/2;
    toothpicks.push(new Toothpick(0, 0, 100, 0, 0))
    toothpicks.push(new Toothpick(0, 0, -100, 0, 0))
}


function draw() {
    background(0);

    translate(width / 2, height / 2);
    let factor = float(width)/(maxX - minX);
    scale(factor);
    strokeWeight(1/factor);
    stroke(255);
    let next = [];
    for (let t of toothpicks) {
        minX = min(t.x, minX);
        maxX = max(t.x, maxX);
        t.show();
        next.push(t);
        if (t.isChecked || toothpicks.length > 12000) continue;

        let both = t.createBoth(toothpicks);
        next = next.concat(both);
        t.isChecked = true;
    }
    if (next.length) toothpicks = next;
}
