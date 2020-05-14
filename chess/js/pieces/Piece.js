class Piece{
    constructor(x, y, color, board){
        this.x = x;
        this.y = y;
        this.color = color[0];
        this.side = color[1];
        this.board = board;
    }
    getName(){
        return "pawn"
    }
    canMove(newX, newY, board){
        return true;
    }

    draw(){
        const n = this.side[0]+"_"+this.getName() + ".png";
        const w = this.board.tileW;
        fill(this.color);
        push();
        translate((this.x - 4 + 0.5) * w, (this.y - 4 + 0.5 - 0.1) * w);
        image(images[n], -w / 3, w / 2, w / 1.5, -w*0.8)
        pop();
    }

    moveTo(newPos){
        this.x = newPos.x;
        this.y = newPos.y;
    }
}