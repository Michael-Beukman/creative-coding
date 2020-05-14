class Ball{
    /**
     * 
     * @param {p5.Vector} pos 
     * @param {p5.Vector} vel 
     * @param {p5.Vector} acc 
     */
    constructor(pos, vel=null, acc=null, r=10){
        this.pos = pos
        this.vel = vel || createVector();
        this.acc = acc || createVector();
        this.r = r;
        this.col = [255,255,255];
    }

    /**
     * Returns the [new pos, new vel, new acc]. Does not change anything
     * @return Ball
     */
    update(){
        const tmp = p5.Vector.add(this.vel, this.acc);
        
        let newP = p5.Vector.add(tmp, this.pos);
        let newV = tmp;
        if (newP.x >= width/2 || newP.x <=-width/2){
            // reflect
            newP = this.pos.copy();
            newV = this.reflect(newV, createVector(newP.x > 0 ? -1 : 1, 0));
        }else if (newP.y >=height/2 || newP.y<=-height/2){
            newP = this.pos.copy();
            newV = this.reflect(newV, createVector(0, newP.y > 0 ? -1 : 1));
        }
        
        const newA = createVector();
        const b = new Ball(newP, newV, newA, this.r);
        b.col = this.col;
        return b;   
    }

    intersect(other){
        return p5.Vector.sub(this.pos, other.pos).magSq() < pow((other.r + this.r)/2,2)
    }

    /**
     * @returns {Ball}
     */
    copy(){
        const b = new Ball(this.pos.copy(), this.vel.copy(), this.acc.copy());;
        b.col = this.col;
        return b;
    }

    draw(){
        fill(this.col);
        ellipse(this.pos.x, this.pos.y, this.r*2);
        const tmp = this.vel.copy();
        tmp.mult(this.r*2);
        line(this.pos.x, this.pos.y, this.pos.x+tmp.x, this.pos.y+tmp.y);
    }

    reflect(v1, n){
        const d  = p5.Vector.dot(v1, n);
        const asq = n.magSq();
        return p5.Vector.sub(v1, p5.Vector.mult(n, 2 * d/asq));
    }
}