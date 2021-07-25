var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let board;
let images = {};

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    board = new Board();
    const names = [
        'b_bishop.png',
        'b_king.png',
        'b_knight.png',
        'b_pawn.png',
        'b_queen.png',
        'b_rook.png',
        'w_bishop.png',
        'w_king.png',
        'w_knight.png',
        'w_pawn.png',
        'w_queen.png',
        'w_rook.png',
    ];
    for (let n of names){
        images[n] = loadImage("assets/pieces/"+n);
    }
    
}

function draw() {
    background(0);
    stroke(255)
    board.draw();
    // noLoop();    
}


function mousePressed(){
    const x = floor((mouseX - width/2) / board.tileW) + 4
    const y = floor((mouseY - height/2) / board.tileW) + 4
    // rect(x * board.tileW, y * board.tileW, board.tileW, board.tileW)
    // console.log(x, y);
    board.select(x,y)
}