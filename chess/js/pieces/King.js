class King extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, board);
    this.rook = new Rook(x, y, color, board);
    this.bishop = new Bishop(x, y, color, board);
  }

  canMove(newX, newY, board) {
    const diffX = newX - this.x;
    const diffY = newY - this.y;
    const aX = abs(diffX);
    const aY = abs(diffY);
    if (aX > 1 || aY > 1) return false;
    // need to make sure of checks
    const canDo =
      this.rook.canMove(newX, newY, board) ||
      this.bishop.canMove(newX, newY, board);

    if (!canDo) return false;

    // check for checks
    const tmpPiece = board.board[newY][newX];
    board.board[newY][newX] = this;
    board.board[this.y][this.x] = null;
    const tmp = board.pieces.filter(p => p.side != this.side).filter(p=>p.canMove(newX, newY, board));
    board.board[newY][newX] = tmpPiece;
    board.board[this.y][this.x] = this;
    console.log(tmp)
    if (tmp.length > 0) return false;
    return true;
  }

  getName() {
    return "king";
  }

  moveTo(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;

    this.rook.moveTo(newPos);
    this.bishop.moveTo(newPos);
  }
}
