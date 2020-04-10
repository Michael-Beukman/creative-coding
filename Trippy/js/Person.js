class Person {
    constructor(x, y, r, col, moveSpeed, infected=false) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.moveSpeed = moveSpeed;
        this.infected = infected;
    }

    update() {
        this.x += this.moveSpeed.x;
        this.y += this.moveSpeed.y;

        if (this.y <=0 || this.y >= height) this.moveSpeed.y *= -1;
        if (this.x <=0 || this.x >= width) this.moveSpeed.x *= -1;

    }

    show() {
        if (this.infected){
            fill(255,255,0);
        }else{
            fill(0,255,0);
        }

        ellipse(this.x, this.y, this.r);
    }


    touching(x, y, r){
        return sqrt(pow(x-this.x, 2) + pow(y-this.y,2)) < r + this.r;
    }

    turnAround(){
        this.moveSpeed.x *=-1;
        this.moveSpeed.y *=-1;
    }

    addNoise(){
        this.moveSpeed.x += (random() * 2 -1)/4;
        this.moveSpeed.y += (random() * 2 -1)/4;
    }
}