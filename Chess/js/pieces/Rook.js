class Rook extends Piece {
  canMove(newX, newY, board) {
    const diffX = newX - this.x;
    const diffY = newY - this.y;
    const aX = abs(diffX);
    const aY = abs(diffY);

    if (aX != 0 && aY != 0) return false;
    const dX = diffX / (aX || 1);
    const dY = diffY / (aY || 1);
    // now check obstruction
    console.log({ newX, newY });
    for (let i = 1; i < max(aX, aY); ++i) {
      const newX = this.x + i * dX;
      const newY = this.y + i * dY;
      console.log({ newX, newY });

      if (board.board[newY][newX]) return false;
    }
    if (board.board[newY][newX]) {
      if (board.board[newY][newX].side != this.side) return true;
      return false;
    }

    return true;
  }

  getName() {
    return "rook";
  }
  //   draw() {
  //     const w = this.board.tileW;
  //     fill(this.color);
  //     push();
  //     translate((this.x - 4 + 0.5) * w, (this.y - 4 + 0.5) * w);
  //     rect(-w / 4, (3 * w) / 8, w / 2, (-3 * w) / 4);
  //     rect(-w * 0.4, (3 * w) / 8, w * 0.8, (-1 * w) / 4);

  //     ellipse(0, (-3 * w) / 8, 140, 20);
  //     pop();
  //   }

  otherColor() {
    if (this.side == "white") {
      return [0, 0, 0];
    } else {
      return [255, 255, 255];
    }
  }

  moveTo(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
  }
}
