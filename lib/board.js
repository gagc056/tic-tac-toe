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
    const winCombination= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let win= null;

    winCombination.forEach((subarray)=>{
      let mark= 'O';
      let counter=0;
      subarray.forEach((index)=>{
        if(this.board[index]===mark){
          counter += 1;
          if(counter===3){
            win=mark;
          }
        }
      })
      mark='X';
      counter=0;
      subarray.forEach((index)=>{
        if(this.board[index]===mark){
          counter += 1;
          if(counter===3){
            win=mark;
          }
        }
      })
    })
    return win;
  }

  hasDraw(){
    TODO
  }
}


export const boardFactory = () => new Board();
