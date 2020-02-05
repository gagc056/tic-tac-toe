import boardFactory from './board';

class Game {
  constructor(playerName, otherName, display, events) {
    this.playerName = playerName;
    this.otherName = otherName;
    this.playerMark = 'X';
    this.otherMark = 'O';
    this.board = boardFactory();
    this.display = display;
    this.updateStatus();

    events.onPlayMove = this.playMove.bind(this);
  }

  updateStatus() {
    const name = this.playerName;
    const mark = this.playerMark;
    let newStatus = null;
    if (this.board.hasWinner()) {
      newStatus = `Congratulations ${name}, you won!`;
    } else if (this.board.hasDraw()) {
      newStatus = 'No winners! It\'s a draw!';
    } else {
      newStatus = `Player ${name}, your mark is '${mark}'. Do your move.`;
    }

    this.display.presentStatus(newStatus);
    this.display.presentBoard(this.board);
  }

  playMove(position) {
    if (!this.board.hasWinner() && !this.board.hasDraw()) {
      const moveDone = this.board.setMarkAt(position, this.playerMark);
      if (moveDone) {
        if (!this.board.hasWinner()) {
          const temporaryMark = this.playerMark;
          this.playerMark = this.otherMark;
          this.otherMark = temporaryMark;

          const temporaryName = this.playerName;
          this.playerName = this.otherName;
          this.otherName = temporaryName;
        }

        this.updateStatus();
      }
    }
  }
}

const gameFactory = (playerName, otherName, display, events) => new Game(playerName, otherName, display, events);

export default gameFactory;
