class Board {
  constructor() {
    this.w = 8;
    this.pieces = [];
    const minW = min(width, height);
    const maxW = max(width, height) * 0.8;
    this.tileW = min(minW, maxW) / this.w;
    this.board = [];

    this.addPieces();
    this.selectedSquare = null;

    this.states = {
      WHITE_TURN: 0,
      BLACK_TURN: 1,
    };
    this.previousMove = [];
    this.currentState = this.states.WHITE_TURN;
  }

  select(x, y) {
    if (
      this.selectedSquare &&
      this.selectedSquare.x == x &&
      this.selectedSquare.y == y
    )
      this.selectedSquare = null;
    else if (this.selectedSquare) {
      // now move
      console.log(this.board[this.selectedSquare.y][this.selectedSquare.x], [
        this.selectedSquare.x,
        this.selectedSquare.y,
      ]);
      const piece = this.board[this.selectedSquare.y][this.selectedSquare.x];
      if (piece) {
        this.attemptMove(this.selectedSquare, { x, y }, piece);
        this.selectedSquare = null;
      }
    } else {
      this.selectedSquare = { x, y };
    }
  }

  outOfBounds(pos) {
    const { x, y } = pos;
    for (let i of [x, y]) {
      if (i < 0 || i >= this.w) return true;
    }
    return false;
  }

  attemptMove(startPos, endPos, piece) {
    if (this.currentState == this.states.BLACK_TURN && piece.side != "black") {
      return;
    }
    if (this.currentState == this.states.WHITE_TURN && piece.side != "white") {
      return;
    }
    if (this.outOfBounds(endPos)) return;
    console.log(piece, piece.canMove);
    if (piece.canMove(endPos.x, endPos.y, this)) {
      if (piece.ep) {
          // en passant
          (this.board[piece.ep.y][piece.ep.x]) = null; 
          (this.board[endPos.y][endPos.x]) = piece.ep;
      }
      if (this.board[endPos.y][endPos.x]) {
        // then capture
        this.pieces = this.pieces.filter(
          (x) => x != this.board[endPos.y][endPos.x]
        );
      }
      this.board[startPos.y][startPos.x] = null;
      this.board[endPos.y][endPos.x] = piece;
      piece.moveTo(endPos);
      this.currentState =
        this.currentState == this.states.BLACK_TURN
          ? this.states.WHITE_TURN
          : this.states.BLACK_TURN;
      this.previousMove = { piece, startPos, endPos };
    }
  }

  addPieces() {
    // pawns
    for (let i = 0; i < this.w; ++i) {
      //white
      this.pieces.push(new Pawn(i, 1, [255, "white"], this));

      //black
      this.pieces.push(new Pawn(i, this.w - 2, [0, "black"], this));
    }

    // bishops
    this.pieces.push(new Bishop(2, 7, [0, "black"], this));
    this.pieces.push(new Bishop(2, 0, [255, "white"], this));

    this.pieces.push(new Bishop(5, 7, [0, "black"], this));
    this.pieces.push(new Bishop(5, 0, [255, "white"], this));

    //rooks

    this.pieces.push(new Rook(0, 7, [0, "black"], this));
    this.pieces.push(new Rook(0, 0, [255, "white"], this));

    this.pieces.push(new Rook(7, 7, [0, "black"], this));
    this.pieces.push(new Rook(7, 0, [255, "white"], this));

    // knights
    this.pieces.push(new Knight(1, 7, [0, "black"], this));
    this.pieces.push(new Knight(6, 7, [0, "black"], this));

    this.pieces.push(new Knight(1, 0, [255, "white"], this));
    this.pieces.push(new Knight(6, 0, [255, "white"], this));

    //queen
    this.pieces.push(new Queen(4, 7, [0, "black"], this));

    this.pieces.push(new Queen(4, 0, [255, "white"], this));

    // king
    this.pieces.push(new King(3, 7, [0, "black"], this));

    this.pieces.push(new King(3, 0, [255, "white"], this));

    for (let x = 0; x < this.w; ++x) {
      const t = [];
      for (let y = 0; y < this.w; ++y) {
        t.push(null);
      }
      this.board.push(t);
    }
    for (let p of this.pieces) {
      this.board[p.y][p.x] = p;
    }
  }

  draw() {
    translate(width / 2, height / 2);

    this.drawBoard();
    this.drawPieces();
  }

  drawBoard() {
    for (let x = 0; x < this.w; ++x) {
      for (let y = 0; y < this.w; ++y) {
        const i = x + y;
        let col;
        if (i % 2 == 0) col = [255, 255, 210];
        else col = [0, 100, 100];

        if (
          this.selectedSquare &&
          x == this.selectedSquare.x &&
          y == this.selectedSquare.y
        ) {
          for (let i in col) col[i] *= 0.5;
        }
        // console.log(this.selectedSquare, { x, y });
        fill(col);
        stroke(0);
        rect(
          (x - 4) * this.tileW,
          (y - 4) * this.tileW,
          this.tileW,
          this.tileW
        );
      }
    }
  }

  drawPieces() {
    for (let p of this.pieces) {
      p.draw();
    }
  }
}
