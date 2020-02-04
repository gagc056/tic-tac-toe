class Board {
  constructor() {
    this.board = (new Array(9)).fill(null);
  }

  getMarkAt(position) {
    return this.board[position - 1];
  }

  setMarkAt(position, mark) {
    if (this.board[position - 1] === null) {
      this.board[position - 1] = mark;
      return true;
    }
    return false;
  }

  hasWinner() {
  }
}

export const boardFactory = () => new Board();
