class Vec4{
    constructor(x=0, y=0, z=0, w=0){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
    }
    mult(num){
        this.x *=num;
        this.y *=num;
        this.z *=num;
        this.w *=num;
        return this;
    }
}