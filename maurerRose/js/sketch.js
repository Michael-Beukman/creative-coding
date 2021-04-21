var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight * 0.99;
var w = cDiv.offsetWidth * 0.99;
let angle = 0;
let ns = [
    1/5, 3/4, 2, 3 //, 4, 5, 6, 7
];
function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);

}

function draw() {
    background(0);
    stroke(255)
    const angle = (millis() / 100 % 360);
    text(angle, 50,50,100,100)
    
    const ree = sqrt(ns.length)
    const R = 500 / ree;
    const lx = w / (ree);
    const ly = h / (ree);
    for (let x=0; x<ree; x+=1){
        // break;
        for (let y=0; y<ree; y+=1){
            const i = x * ree + y;
            // translate(w/2,h/2);
            push();
            translate(lx * x + lx/2, ly * y + ly/2);
            // const n = 2;
            // const n = (millis() / 100) + 2;
            const n = ns[i];
            maurerRose(n, angle, R)
            drawRose(1, n, R);
            pop();
        }
    }
    // line(0,0,width,height);
    // translate(w/2, h/2)
    // drawRose(1, 3/4, 100)
    // maurerRose(3/4, 31, 100);
    

}
function mouseClicked(){
    angle+=1;
}

function drawRose(a, n, R){
    
    noFill();
    stroke(255,0,0)
    beginShape();
    const d = 0.001;
    const reee = TWO_PI / n*4;
    for (let t=0; t<=reee; t+=d){
        const r = a * sin(n * t);
        vertex(R * r * cos(t), r * sin(t) * R);
    }
    endShape();
}

function maurerRose(n, d_, R){
    strokeWeight(2)
    stroke(0,0, 255, 100)
    for (let d=d_; d<=d_; d+=1){

    beginShape();
    
    for (let i=1; i<= 360; ++i){
        const k1 = (i-1) * d;
        const k2 = (i) * d;
        const rk1 = k1 * PI/180;
        const rk2 = k2 * PI/180;
        const r1 = sin(rk1*n); const r2 = sin(rk2*n);
        // print(r1, rk1);
        line(R * r1*cos(rk1), R * r1*sin(rk1), R * r2*cos(rk2), R * r2*sin(rk2))
        // vertex(R * r2*cos(rk2), R * r2*sin(rk2))
        // line(R*sin(), k1, R*sin(n*k2 * PI/180), k2)
    }
    endShape();
}
}