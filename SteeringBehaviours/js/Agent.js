class Agent{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.maxForce = 0.1;
        this.maxSpeed = 5;
    }

    update(){
        this.v.add(this.a);
        this.v.limit(this.maxSpeed);
        this.pos.add(this.v);
        this.a.mult(0);
    }

    draw(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.v.heading() - PI/2);
        triangle(-10, -10, 10, -10, 0, 20);
        pop();
    }

    steer(vec){
        const desired = p5.Vector.sub(vec, this.pos);
        desired.setMag(this.maxSpeed);
        const diff = p5.Vector.sub(desired, this.v);
        diff.setMag(this.maxForce);
        this.a = diff;
    }

    steerWall(){
        //line = pos + lambda * v
    }

    steerObj(){

    }
}