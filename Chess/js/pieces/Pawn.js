class Pawn extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, board);
    this.directionY = this.side == "white" ? -1 : 1;
    this.hasMoved = false;

    this.ep = null;
  }
  canMove(newX, newY, board) {
    this.ep = null;
    const diffX = this.x - newX;
    const diffY = this.y - newY;
    console.log({ diffX, diffY }, this.hasMoved);
    if (abs(diffX) > 2 || abs(diffY) > 2 || diffY == 0) return false;
    if (diffY * this.directionY < 0) return false; // wrong direction;
    // normal forward moves
    if (diffX == 0 && abs(diffY) == 1 && board.board[newY][newX] == null) {
      return true;
    }
    // double move
    if (
      !this.hasMoved &&
      diffX == 0 &&
      abs(diffY) == 2 &&
      board.board[newY][newX] == null &&
      board.board[newY + this.directionY][newX] == null
    ) {
      return true;
    }

    // capture

    if (
      abs(diffX) == 1 &&
      abs(diffY) == 1 &&
      board.board[newY][newX] != null &&
      board.board[newY][newX].side != this.side
    ) {
      return true;
    }

    if (abs(diffX) == 1 && abs(diffY) == 1 && board.board[newY][newX] == null) {
      // possible e.p.
      const possiblePiece = board.board[this.y][newX];
      console.log("possible",         possiblePiece != null,
      possiblePiece.side != this.side,
      possiblePiece instanceof Pawn)
      if (
        possiblePiece != null &&
        possiblePiece.side != this.side &&
        possiblePiece instanceof Pawn
      ) {
        const prevMove = board.previousMove;
        console.log(prevMove, this);
        if (prevMove.endPos.x == newX && prevMove.endPos.y == this.y) {
          if (abs(prevMove.endPos.y - prevMove.startPos.y) == 2) 
            this.ep = possiblePiece;
            return true;
        }
      }
    }

    // ep later todo
    return false;
  }

  moveTo(endPos) {
    super.moveTo(endPos);
    console.log("moved to before ", this.hasMoved);

    this.hasMoved = true;
    console.log("moved to ", this.hasMoved);
  }
}
