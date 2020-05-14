var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;


function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);

}

function draw() {
    background(0);
    stroke(255)
    noLoop();
    const m1 = new Matrix([
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ]);
    const m2 = new Matrix([
        [10,20,30],
        [40,50,60],
        [70,80,90]
    ]);

    console.log(m1.string())
    console.log(m2.string())

    console.log(m1.mult(m2).string())
    console.log(m2.mult(m1).string())
    
}

