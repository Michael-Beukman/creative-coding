class Circle {
    constructor(x, y, r, col, moveSpeed, circleSpeed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.moveSpeed = moveSpeed;
        this.circleSpeed = circleSpeed;
        this.angle = 0;
    }

    update() {
        this.x += this.moveSpeed.x;
        this.y += this.moveSpeed.y;

        if (this.y <=0 || this.y >= height) this.moveSpeed.y *= -1;
        if (this.x <=0 || this.x >= width) this.moveSpeed.x *= -1;

        this.angle += this.circleSpeed;
    }

    show() {
        ellipse(this.x, this.y, this.r, this.r);
        const p = this.r / 4;
        const dx = p * cos(this.angle);
        const dy = p * sin(this.angle);
        // fill(255, 255, 255, 100);
        ellipse(this.x + dx, this.y + dy, this.r / 2, this.r / 2)
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