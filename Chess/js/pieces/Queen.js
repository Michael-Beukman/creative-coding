class Queen extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, board);
    this.rook = new Rook(x, y, color, board);
    this.bishop = new Bishop(x, y, color, board);
  }

  canMove(newX, newY, board) {
    return (
      this.rook.canMove(newX, newY, board) ||
      this.bishop.canMove(newX, newY, board)
    );
  }

  getName() {
    return "queen";
  }

  moveTo(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;

    this.rook.moveTo(newPos);
    this.bishop.moveTo(newPos);
  }
}
