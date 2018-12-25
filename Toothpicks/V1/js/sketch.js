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
    toothpicks.push(new Toothpick(0, 0, 1))
}

function draw() {
    background(0);

    translate(width / 2, height / 2);
    scale(float(width)/(maxX - minX));
    stroke(255);
    let next = [];
    let isOutCount = 0;
    for (let t of toothpicks) {
        minX = min(t.x, minX);
        maxX = max(t.x, maxX);
        t.show();
        next.push(t);

        if (t.isChecked || isOutCount < -1000 || toothpicks.length > 12000) continue;
        
        let both = t.createBoth(toothpicks);
        next = next.concat(both);
        t.isChecked = true;
        // let tA = t.createA(toothpicks);
        // let tB = t.createB(toothpicks);
        // if (tA) next.push(tA);
        // if (tB) next.push(tB);
    }
    if (next.length) toothpicks = next;
}
