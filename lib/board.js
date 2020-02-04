    const board=document.getElementById('board') ;
    const x_ClASS= 'X';
    const o_CLASS='O';
    const cellElements=document.querySelectorAll('[data-cell]');
    let oTurn;
    let xTurn;

    cellElements.forEach(cell=>{
      cell.addEventListener('click',handleClick,{once:true});
    })

    function doClick(e){
      const cell=e.target;
      const currentClass=xTurn?  x_CLASS:o_CLASS;
      getMarkAt(cell,currentClass)
      if (checkWin(currentClass)) {
        endGame(false)
      } else if (hasDraw()) {
        endGame(true)
      } else {
        swapTurns()
        setBoardClass()
      }
    }

    function getMarkAt(cell,currentClass){
      cell.classList.add(currentClass)
    }

    const getPlayers = function() {
      let playerOneName = document.querySelector("input[name=p1]").value || "Player1";
      let playerOneName = document.querySelector("input[name=p2]").value || "Player2";
      let player1 = Player(playerOneName, "X");
      let player2 = Player(playerOneName, "O");

    }

    function swapTurns(){
      getPlayers()
      xTurn=oTurn;
    }

    function startGame(){
      oTurn=false;
      console.log (`please write your name:${plyerOneName}`)
      console.log (`please write your name:${plyerTwoName}`)

      cellElements.forEach(cell => {
        cell.addEventListener('click',doClick,{once:true})
      });
      setBoardClass()
    }

    function setBoardClass(){
      board.classList.remove(x_ClASS)
      board.classList.remove(o_ClASS)
      if (xTurn){
        board.classList.add(x_ClASS)
      }
      else{
        board.classList.add(o_CLASS)
      }
    }

    function hasDraw() {
      return [...cellElements].every(cell => {
        return cell.classList.contains(x_CLASS) || cell.classList.contains(o_CLASS)
      })
    }
    const checkWinner=((currentClass)=>{

      const win_cond = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];

      return  win_cond_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentClass)

        })
      })

    })