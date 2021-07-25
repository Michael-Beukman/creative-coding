class Bishop extends Piece {
  canMove(newX, newY, board) {
    const diffX = newX - this.x;
    const diffY = newY - this.y;
    const aX = abs(diffX);
    const aY = abs(diffY);

    if (aX != aY || aX==0) return false;
    const dX = diffX / aX;
    const dY = diffY / aY;
    // now check obstruction
    for (let i=1; i<aX; ++i){
        const newX = this.x + i * dX;
        const newY = this.y + i * dY;
        if (board.board[newY][newX]) return false;
    }
    if (board.board[newY][newX]) {
        if (board.board[newY][newX].side != this.side)
            return true;
        return false;
    }
    
    return true;
  }
  getName(){
      return "bishop"
  }
//   draw() {
//     const w = this.board.tileW;
//     fill(this.color);
//     push();
//     translate((this.x - 4 + 0.5) * w, (this.y - 4 + 0.5 - 0.1) * w);
//     triangle(-w / 4, +w / 2, w / 4, +w / 2, 0, -1*w/4);
//     ellipse(0, -w / 8, w/4, w/2);
//     fill(this.otherColor())
//     ellipse(0,-w/8,10)
//     pop();
//   }

  otherColor(){
      if (this.side == 'white'){
        return [0,0,0];
      }else {
        return [255,255,255]
      }
  }

  moveTo(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
  }
}
