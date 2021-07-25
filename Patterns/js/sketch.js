var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let time = 0;
let speed = 2;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);

}

function draw() {
    background(0);
    stroke(255)
    translate(width/2, height/2);
    noFill();
    tris(50);
    time += speed;
    if (time >= 1000 || time < 0) speed *=-1;
}


function square(size){
    if (size < 50) return;
    rect(-size/2, -size/2, size, size);
    let factor = time % 1000;
    factor /= 1000;
    for (let i=-1; i<=1; i+=2)
        for (let j=-1; j<=1; j+=2){
            push();
            colorMode(HSB);
            translate(factor * i*size/2, factor * j*size/2);
            // stroke(factor * 155 - j * 50, (1-factor) * 155 + i * 100, 155);
            stroke(factor * 155 + i *50 + j * 100, 155, 255);
            square(size/2);
            pop();
        }

}

function tris(size, count=5){
    if (size <10 || count ==0) return
    const t = sqrt(3)/4 * size;
    triangle(
        -size/2, t,
        size/2, t,
        0, -t
    );

    push();
    translate(-size/4, t/2);
    tris(size, count-1);
    pop();

    push();
    translate(size/4, t/2);
    tris(size, count-1);
    pop();

    push();
    translate(0, -t/2);
    tris(size, count-1);
    pop();
}

