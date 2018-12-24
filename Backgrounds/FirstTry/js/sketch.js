var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let point = { x: 0, y: 200 };
let angle = 0;
let circleSpeed;
let moveSpeed;
let circles = [];

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    circleSpeed = 0.1;
    const time = circleSpeed * 2 * PI;
    moveSpeed = width / time / 1000;

    circles.push(new Circle(0, 0, 100, [], {x:moveSpeed, y:moveSpeed}, circleSpeed));
    circles.push(new Circle(width, 0, 100, [], {x:-moveSpeed, y:moveSpeed}, circleSpeed));
    for (let i=0; i<20; ++i){
        circles.push(new Circle(random(width), random(height), random(10,100),[], {x:random(-moveSpeed, moveSpeed), y:random(-moveSpeed, moveSpeed)}, circleSpeed));
    }
}

function draw() {
    background(0);
    stroke(255, 255, 255, 120);
    for (let i=0; i<circles.length; ++i) {
        const circle = circles[i];
        for (let j=i+1; j<circles.length; ++j){
            if (circle.touching(circles[j].x, circles[j].y, circles[j].r)){
                circles[i].turnAround();
                circles[j].turnAround();
                circles[i].addNoise();
                circles[j].addNoise();
            }
        }
        circle.update();
        circle.show();
    }
    noFill();

}

function circle(x, y, r) {
    ellipse(x, y, r, r);
    const p = r / 4;
    const dx = p * cos(angle);
    const dy = p * sin(angle);
    fill(255, 255, 255, 100);
    ellipse(x + dx, y + dy, r / 2, r / 2)
}