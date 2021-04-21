class Net{
    constructor(maxX, maxY){
        this.maxX = maxX; this.maxY = maxY;
    }
    getVal(x, y){
        x = x / this.maxX;
        y = y / this.maxY;
        const s = sin((x+y) * 1 * PI)
        const v = (s + 1)*127.5
        return [y*x*255,0,x*x*255];
    }
}