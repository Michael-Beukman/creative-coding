/// <reference path="../p5.d/p5.global-mode.d.ts" />
var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
// let len = 100;
let toothpicks = [];
function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    // drawLine(0, -100, 0, 100)
    toothpicks.push(new Toothpick(0, 0, 1))
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    stroke(255);
    let next = [];
    let doSwitch = true;
    let isOutCount = 0;
    for (let t of toothpicks) {
        t.show();
        next.push(t);
        if (toothpicks.length > 12000) continue;
        if (t.isChecked) {
            continue;
        }
        if (isOutCount > 1000) continue;

        let tA = t.createA(toothpicks);
        let tB = t.createB(toothpicks);
        t.isChecked = true;
        if (tA) next.push(tA);
        if (tB) next.push(tB);
    }
    if (next.length) toothpicks = next;
}

function drawLine(x, y, endX, endY, count = 0) {
    // console.log(x, y, endX, endY, count)
    if (count > 3) return;
    if (count == 3) stroke(255, 0, 0, 100);
    line(x, y, endX, endY);
    if (count % 2 == 0) {
        drawLine(x - len, y, endX + len, y, count + 1);
        drawLine(x - len, endY, endX + len, endY, count + 1);
    } else {
        drawLine(x, y - len, x, endY + len, count + 1);
        drawLine(endX, y - len, endX, endY + len, count + 1);
    }
}

function resetValues(OBJ) {

}