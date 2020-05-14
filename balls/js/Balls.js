class Balls{
    constructor(size=10){
        // num of balls
        /**
         * @type {Ball[]}
         */
        this.balls = [new Ball(createVector(0,0), createVector(2,0)), new Ball(createVector(100,0))];
        this.balls[0].col=[255,0,0];
        this.attractionRadius = 1000;
    }
    
    update(){
        /**
         * @type {Ball[]}
         */
        const newBalls = this.balls.map(b => b.update());
        // now do collisions
        const correctedBalls = newBalls.map(b => b.copy());
        // console.log(newBalls);   
        for (let i =0; i< newBalls.length; ++i){
            const b = newBalls[i];
            for (let j=i+1; j<newBalls.length; ++j){
                const other = newBalls[j];
                if (b.intersect(other)){
                    // we need to offset both to a point when the collision didn't happen, and change the velocities by adding a force.
                    
                    //offset positions
                    const diffVec = p5.Vector.sub(b.pos, other.pos);
                    diffVec.div(2);
                    correctedBalls[i].pos.add(diffVec);
                    correctedBalls[j].pos.sub(diffVec);
                    

                    // offset velocities, i.e. the acc
                    diffVec.div(2);
                    const totalVel = p5.Vector.add(b.vel, other.vel).div(2);
                    diffVec.normalize().mult(totalVel);
                    const normal = createVector(diffVec.x, diffVec.y).normalize();
                    //correctedBalls[i].vel.add(diffVec);
                    correctedBalls[i].vel.normalize().mult(-1* totalVel.mag())
                    correctedBalls[j].acc.sub(diffVec);
                    // correctedBalls[i].acc.add(b.reflect(b.vel, normal));
                    // correctedBalls[j].acc.sub(b.reflect(other.vel, normal));
                }
                const diff = p5.Vector.sub(b.pos, other.pos);
                const dsq = diff.magSq();
                if (dsq < pow(this.attractionRadius, 2) && dsq>b.r){
                    diff.normalize();
                    console.log('ree', dsq)
                    correctedBalls[i].acc.sub(p5.Vector.mult(diff, 2/dsq));
                    correctedBalls[j].acc.add(p5.Vector.mult(diff, 2/dsq));
                }
            }
        }
        this.balls = correctedBalls;
    }

    draw(){
        this.balls.forEach(b=>b.draw());
    }
}