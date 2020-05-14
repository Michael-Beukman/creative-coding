class Knight extends Piece {
  canMove(newX, newY, board) {
    const diffX = newX - this.x;
    const diffY = newY - this.y;
    const aX = abs(diffX);
    const aY = abs(diffY);
    const isGood = () => {
      return (aX == 2 && aY == 1) || (aX == 1 && aY == 2);
    };
    if (!isGood()) return false;
    if (board.board[newY][newX]) {
      if (board.board[newY][newX].side != this.side) return true;
      return false;
    }
    return true;
  }

  getName() {
    return "knight";
  }

  moveTo(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
  }
}
