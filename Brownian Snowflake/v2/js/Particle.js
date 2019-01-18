class Particle{
    constructor(x, y){
        this.pos = createVector(x,y);
        this.r = 3;
    }

    show(){
        // ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2); 
        point(this.pos.x, this.pos.y)
    }

    update(){
        this.pos.x -=1;
        this.pos.y += random(-5,5);
        let angle = this.pos.heading();
        angle = constrain(angle, 0, PI/6);
        let mag = this.pos.mag();
        this.pos = p5.Vector.fromAngle(angle);
        this.pos.setMag(mag);
        // this.pos.x = mag * cos(angle);
        // this.pos.y = mag * sin(angle);
    }

    finished(){
        return this.pos.x < 1;
    }

    intersects(flake){
        for (let other of flake){
            if (p5.Vector.dist(other.pos, this.pos) < 2*this.r) return true;
        }
        return false;
    }

}