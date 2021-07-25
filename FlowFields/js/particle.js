class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    draw(){
        stroke(255);
        ellipse(this.x, this.y, 8);
    }
}
