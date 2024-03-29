let len = 31

function Toothpick(x, y, dir=1){

    this.dir = dir;
    this.centerX = x;
    this.centerY = y;
    this.isChecked = false;
    if (dir==1){
        this.x = x - len/2;
        this.endX = x + len/2
        this.y = y;
        this.endY = y;
    }else{
        this.x = x ;
        this.endX = x;
        this.y = y- len/2;;
        this.endY = y + len/2;
    }
    
    this.show = () =>{
        stroke(255);
        line(this.x, this.y, this.endX, this.endY);
    }
    
    this.createA = (picks) => {
        return this.create(picks, this.x, this.y);
    } 
    this.createB = (picks) => {
        return this.create(picks, this.endX, this.endY);
    } 
    this.create = (picks, x, y) => {
        for (let pick of picks){
            if (pick == this) continue;
            if (pick.x == x && pick.y ==y || pick.endX == x && pick.endY == y || pick.centerX == x && pick.centerY == y){
                return null;
            }     
        }
        return new Toothpick(x,y,1-dir);
    }

    this.createBoth = (picks) =>{
        let newPicks = [];
        let left = false;
        let right = false;
        for (let pick of picks){
            if (left && right) break;
            if (pick == this) continue;
            let x = this.x;
            let y = this.y;
            if (!left && (pick.x == x && pick.y ==y || pick.endX == x && pick.endY == y || pick.centerX == x && pick.centerY == y)){
                left = true;
            }   
            x = this.endX;
            y = this.endY;
            if (!right && (pick.x == x && pick.y ==y || pick.endX == x && pick.endY == y || pick.centerX == x && pick.centerY == y)){
                right = true;
            }     
        }
        if (!left) newPicks.push(new Toothpick(this.x,this.y,1-dir))
        if (!right) newPicks.push(new Toothpick(this.endX,this.endY,1-dir))
        return newPicks;
    }

    this.isOut = () =>{

        return this.x > width/2 || this.endX > width/2 || this.y > height/2 || this.endY > height/2 || this.x <-width/2 || this.y <-height/2 || this.endX < - width/2 || this.endY <-height/2;
        // return false;
    }
}