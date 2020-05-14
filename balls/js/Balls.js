class Balls{
    constructor(size=10){
        // num of balls
        /**
         * @type {Ball[]}
         */
        this.balls = [];
        this.attractionRadius = 1000;

        // this.addBall(createVector(0,0))
        // this.addBall(createVector(100,0))
        for (let b =0; b<100; ++b){
            this.addBall(p5.Vector.random2D().mult(500), 5);
        }
        // this.balls[0].col=[255,0,0];
        // this.balls[0].vel.x+=2;
    }
    
    update(){
        /**
         * @type {Ball[]}
         */
        const newBalls = this.balls// ;.map(b => b.update());
        newBalls.forEach(b => b.update());
        // now do collisions
        const correctedBalls = newBalls.map(b => b.copy());
        // console.log(newBalls);   
        const ballsColliding = [];
        for (let i =0; i< newBalls.length; ++i){
            const b = newBalls[i];
            for (let j=i+1; j<newBalls.length; ++j){
                const other = newBalls[j];
                if (b.intersect(other)){
                    ballsColliding.push([b, other]);
                    // console.log("ree");
                    // STATIC COLLISIONS
                    const twixt = p5.Vector.sub(b.pos, other.pos);
                    stroke(255,0,0);
                    line(b.pos.x, b.pos.y, other.pos.x, other.pos.y)
                    stroke(255);
                    const dist = twixt.mag();
                    const overlap = dist - b.r - other.r
                    const amountToMove = overlap/2;
                    twixt.normalize().mult(amountToMove);
                    
                    b.pos.sub(twixt)
                    other.pos.add(twixt)
                    
                }
            }
        }

        //DYNAMIC COLLISIONS
        for (let pair of ballsColliding){
            const b1 = pair[0];
            const b2 = pair[1];

            const tmp = p5.Vector.sub(b2.pos, b1.pos);
            const normal = tmp.copy().normalize()

            const tangential = createVector(-normal.y, normal.x);
            
            // how much of the velocity in each direction goes in the tangent direction 
            const dotB1Tangential = p5.Vector.dot(b1.vel, tangential)
            const dotB2Tangential = p5.Vector.dot(b2.vel, tangential)
            


            // normal response
            const dotB1Norm = p5.Vector.dot(b1.vel, normal)
            const dotB2Norm = p5.Vector.dot(b2.vel, normal)

            const M = b1.mass + b2.mass;
            const p1 = (dotB1Norm * (b1.mass - b2.mass) + 2 * b2.mass*dotB2Norm)/(M);
            const p2 = (dotB2Norm * (b2.mass - b1.mass) + 2 * b1.mass*dotB1Norm)/(M);

            b1.vel = p5.Vector.add(p5.Vector.mult(tangential, dotB1Tangential), p5.Vector.mult(normal, p1));
            b2.vel = p5.Vector.add(p5.Vector.mult(tangential, dotB2Tangential), p5.Vector.mult(normal, p2));
        }
        
        // this.balls = correctedBalls;
    }

    draw(){
        this.balls.forEach(b=>b.draw());
    }

    addBall(pos, radius){
        // new Ball(createVector(0,0), createVector(2,0)), new Ball(createVector(100,0))
        const b = new Ball(pos, null, null, radius, this.balls.size);
        this.balls.push(b);
    }
    /**
     * Returns the ball at this point. If no ball exists, returns null;
     * @param {p5.Vector} pos 
     * @return {Ball}
     */
    getBallAtPos(pos){
        for (let b of this.balls){
            if (b.intersect(new Ball(pos, null, null, 0))) return b;
        }
        return null;
    }
}

//old
    //  update(){
    //     /**
    //      * @type {Ball[]}
    //      */
    //     const newBalls = this.balls.map(b => b.update());
    //     // now do collisions
    //     const correctedBalls = newBalls.map(b => b.copy());
    //     // console.log(newBalls);   
    //     for (let i =0; i< newBalls.length; ++i){
    //         const b = newBalls[i];
    //         for (let j=i+1; j<newBalls.length; ++j){
    //             const other = newBalls[j];
    //             if (b.intersect(other)){
    //                 // we need to offset both to a point when the collision didn't happen, and change the velocities by adding a force.
                    
    //                 //offset positions
    //                 const diffVec = p5.Vector.sub(b.pos, other.pos);
    //                 diffVec.div(2);
    //                 correctedBalls[i].pos.add(diffVec);
    //                 correctedBalls[j].pos.sub(diffVec);
                    

    //                 // offset velocities, i.e. the acc
    //                 diffVec.div(2);
    //                 const totalVel = p5.Vector.add(b.vel, other.vel).div(2);
    //                 diffVec.normalize().mult(totalVel);
    //                 const normal = createVector(diffVec.x, diffVec.y).normalize();
    //                 //correctedBalls[i].vel.add(diffVec);
    //                 correctedBalls[i].vel.normalize().mult(-1* totalVel.mag())
    //                 correctedBalls[j].acc.sub(diffVec);
    //                 // correctedBalls[i].acc.add(b.reflect(b.vel, normal));
    //                 // correctedBalls[j].acc.sub(b.reflect(other.vel, normal));
    //             }
    //             const diff = p5.Vector.sub(b.pos, other.pos);
    //             const dsq = diff.magSq();
    //             if (dsq < pow(this.attractionRadius, 2) && dsq>b.r){
    //                 diff.normalize();
    //                 console.log('ree', dsq)
    //                 correctedBalls[i].acc.sub(p5.Vector.mult(diff, 2/dsq));
    //                 correctedBalls[j].acc.add(p5.Vector.mult(diff, 2/dsq));
    //             }
    //         }
    //     }
    //     this.balls = correctedBalls;
    // }
 