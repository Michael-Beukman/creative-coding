var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let attractors = [];
let particles = [];
const clamp = (x, a, b)=>{
    return max(min(x,b), a);
}
class Particle{
    constructor(pos){
        this.pos = pos;
        
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.dead = false;
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        //if (millis() <= 2000) 
        this.pos.x %= (width/2); this.pos.y %= (height/2)
        // if (this.pos.x <= -width/2 || this.pos.x >= width/2||this.pos.y <= -height/2 || this.pos.y >= height/2)
            // this.makeDead();
        // if ()
        this.acc.mult(0);
    }

    addForce(force){
        this.acc.add(force);
    }
    draw(){
        // fill(255)
        // ellipse(this.pos.x, this.pos.y, 10);
        point(this.pos.x, this.pos.y, 10);
    }

    makeDead(){
        this.dead = true;
    }

    getForce(p){
        const v = p5.Vector.sub(this.pos, p.pos)
        let rsq = v.magSq();
        if (rsq ==0) return createVector();;
        
        v.normalize();
        // if (rsq < 3000) v.mult(-1);
        if (rsq < 20) {
            // p.makeDead();
            rsq = 20;
        }
        v.mult(100/rsq)
        return v;
        // line(p.pos.x, p.pos.y, p.pos.x + v.x, p.pos.y + v.y)
        // p.addForce(v);
    }
}

class Source{
    constructor(pos, mass=1000, direction=1){
        this.pos = pos;
        this.mass = mass;
        this.direction = direction;
    }

    getForce(p){
        const v = p5.Vector.sub(this.pos, p.pos).mult(this.direction);
        let rsq = v.magSq();
        if (rsq ==0) return createVector();;
        
        v.normalize();
        // if (rsq < 3000) v.mult(-1);
        if (rsq < 1000) {
            // p.makeDead();
            // rsq = 20;
        }
        v.mult(this.mass/rsq)
        return v;
        // line(p.pos.x, p.pos.y, p.pos.x + v.x, p.pos.y + v.y)
        // p.addForce(v);
    }

    draw(){
        if (this.direction == 1) fill(0,255,0)
        else fill(255,0,0);
        ellipse(this.pos.x, this.pos.y, 30);
    }
}

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    for (let i =0; i< 10; ++i){
        particles.push(new Particle(p5.Vector.random2D().mult(500)));
    }

    // attractors.push(createVector(0,0))
    background(0);
    attractors.push(new Source(createVector(0,0), 1000, mouseButton === RIGHT ? -1 : 1))
}

function draw() {
    translate(width/2, height/2)
    // fill(255,10)
    // noFill();
    let i=0;
    for (let p of particles){
        const prevPos = p.pos.copy();
        for (let k=0; k< 1; k++)
            p.update();
        // p.draw();
        line(prevPos.x, prevPos.y, p.pos.x, p.pos.y);
        const col1 = i/particles.length * 255;
        const col2 = 255 - i/particles.length * 120;
        const col3 = i/particles.length * 255;
        stroke(col1, col2, col3,50)
        // point(p.pos.x, p.pos.y);
        i++;
        // for (let a of attractors){// p.addForce(a.getForce(p));}
        for (let p2 of particles){
            if (p != p2){
                p.addForce(p2.getForce(p));
            }
        }
    }
    particles = particles.filter(p => !p.dead);
    for (let a of attractors){
        a.draw();
    }
    if (mouseIsPressed)
        attractors.push(new Source(createVector(mouseX - width/2, mouseY - height/2), 1000, mouseButton === RIGHT ? -1 : 1))

}


function mousePressed(){
}