///<reference path="../p5.d/p5.global-mode.d.ts"/>
var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let particles = [];
let numGrids = 20;
let xSpace, ySpace;
let t=0;
const checkNorm = $('#chkNormalize')[0];
const inpSpeed = $('#inpSpeed');
let params = {};
let opts = {
  checked: false,
  speed:0.01,
  xFunc: 'y * sin(t)',
  yFunc: 'x * cos(t)'
};

function setup() {
  //x = x * (a*sin (t) + a*cos(t) + c*y) + y * (d*sin (t) + e*cos(t))
  //y = x * (g*sin (t) + h*cos(t) + i*y) + y * (j*sin (t) + k*cos(t) + l*x)
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  xSpace = width/numGrids;
  ySpace = height/numGrids;
    for (let i=0; i<100; ++i){
        particles.push(new Particle(random(width)-width/2, random(height)-height/2));
    }
}

function getX(x, y){
    // return y;
  const {a, b, c, d, e} = params;
  return x * (a*sin (t) + b*cos(t) + c*y) + y * (d*sin (t) + e*cos(t))
}

function getY(x, y){
    // return -x;
  const {g, h, i, k, j} =params;
  return x * (g*sin (t) + h*cos(t) + i*y) + y * (j*sin (t) + k*cos(t))
}

function draw() {
  checkOpts();
  background(0);
  stroke(255);


  t += opts.speed
  translate(width/2, height/2);
  drawParticles();
  updateParticles()
  for (let i=-numGrids/2; i<=numGrids/2; ++i){
    for (let j=-numGrids/2; j<=numGrids/2; ++j){
        const x = getX(i, j);
        const y = getY(i, j);
        const vec = createVector(x, y);
        const c = vec.mag();
        if (opts.checked)
          vec.normalize();
        stroke(map(c, 0, 30, 0, 255), map(c, 0, 30, 255, 0), 0);
        line(i*xSpace,   j * ySpace, (i+vec.x) * xSpace, (j+vec.y) *ySpace);
        ellipse((i+vec.x)*xSpace, (j+vec.y)*ySpace, 2);
        const tx = (i+vec.x) * xSpace;
        const ty = (j+vec.y) * ySpace;
        // triangle(tx, ty, tx+vec.x*xSpace, ty+vec.y*ySpace, tx+10, ty+10);
        const offset = 5;
        push() //start new drawing state
        var angle = atan2(y, x); //gets the angle of the line
        translate((i+vec.x)*xSpace, (j+vec.y)*ySpace); //translates to the destination vertex
        rotate(angle+HALF_PI); //rotates the arrow point
        triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
         pop();
    }
  }
}

function drawParticles(){
    for (let p of particles){
        p.draw();
    }
}



function checkOpts(){
  checkParams();
  opts.checked = 1 || checkNorm.checked;
  opts.speed = parseFloat(inpSpeed.val())
}

function checkParams(){
  for (let i=0; i < 12;++i){
    const c = char('a'.charCodeAt(0) + i);
    params[c] = parseFloat($('#inp'+c.toUpperCase()).val());
  }
}

function updateParticles(){
    for (let i= particles.length -1; i>=0; --i){
// console.log(particles.length);
        const p = particles[i];
        const x = getX(p.x/xSpace, p.y/ySpace);
        const y = getY(p.x/xSpace, p.y/ySpace);
        p.x += x;
        p.y += y;
        console.log(p.x, p.y);
        if (p.x * p.x + p.y * p.y > height*height + width * width){
            // particles.splice(i);
            // continue;
        }
    }
}

function mousePressed(){
    console.log(particles.length, mouseX - width/2, mouseY);
    particles.push(new Particle(mouseX-width/2, mouseY-height/2));
}
