var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let time = 0;
let speed = 0.1;
let wave = [];
let maxN;
let func = 'square'
let num_tiles = 15;
let numWaves = 3;
let move = true;
let colour = 'rgb';
let should_change_colour = false;
let sigma = 30
let lambd = 1
let phi = 0
let omega = 1

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
}

function draw() {
    let do_things = move;
    if (should_change_colour) {
        colorMode(colour);
        should_change_colour = false;
        do_things = true;
    }
    if (!do_things) return;
    background(0, 0, 0);
    time += speed * deltaTime / 100;
    drawTiles();
    phi = time * move;
}

function drawTiles() {
    let arr = [];
    let min = 10000;
    let max = -100000
    for (let i = 0; i < num_tiles; ++i) {
        let temp = []
        for (let j = 0; j < num_tiles; ++j) {
            const m = i - num_tiles / 2;
            const n = j - num_tiles / 2;
            let intens = 1 / (PI * 2 * sigma * sigma) * Math.exp(- (m * m + n * n) / (2 * sigma * sigma)) * 
                Math.sin(2 * Math.PI*(Math.cos(omega * m) + Math.sin(omega * n)) / lambd + phi)
            temp.push(intens)
            min = Math.min(min, intens)
            max = Math.max(max, intens);
        }
        arr.push(temp);
    }
    for (let i = 0; i < num_tiles; ++i) {
        for (let j = 0; j < num_tiles; ++j) {
            let intens = (arr[i][j] - min) / (max - min) * 255
            fill(intens, 100, 100);
            rect(i * x_width, j * y_width, x_width, y_width)
        }
    }

}

function resetValues(values){
    phi = 0;
    should_change_colour = true;
    colour = values.colourMode;
    speed = values.speed;
    sigma = values.sigma
    omega = values.omega;
    lambd = values.lambda;
    move = values.move;
    num_tiles = values.tiles;
    x_width = w / num_tiles;
    y_width = h / num_tiles;
}