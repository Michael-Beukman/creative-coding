class Checkpoint{
    constructor(x, y, isGood=true, r=16){
        this.pos = createVector(x, y);
        this.r = r;
        this.isGood = isGood;
    }

    show(){
        if (this.isGood) fill(0,255,0);
        else fill(255,0,0);
        ellipse(this.pos.x, this.pos.y, this.r);
    }
}