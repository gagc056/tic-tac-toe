import gameFactory from './lib/game';
import displayFactory from './lib/display';
import eventsFactory from './lib/events';

const layout = {
  outerMargin: 5,
  innerMargin: 5,
  lineWidth: 3,
};

const player1 = document.querySelector('.tic-tac-toe input[name="ttt-player1-name"]');
const player2 = document.querySelector('.tic-tac-toe input[name="ttt-player2-name"]');
const statusBar = document.querySelector('.tic-tac-toe .ttt-status-bar');
const canvas = document.querySelector('.tic-tac-toe canvas');
const display = displayFactory(canvas, layout, statusBar);
const events = eventsFactory(canvas, layout);
const regexEmpty = /^\s*$/;
let game = null;

const newGameClick = (event) => {

  if(player1.value.match(regexEmpty) || player2.value.match(regexEmpty)){
    display.clear();
    display.presentStatus('Error! Name must not be empty!');
    events.onPlayMove = null;
    game = null;
    return;
  }

  game = gameFactory(player1.value, player2.value, display, events);
};

const newGameButton = document.querySelector('.tic-tac-toe .ttt-new-game');

newGameButton.addEventListener('click', newGameClick);

const controlPanel = document.querySelector('.tic-tac-toe .ttt-control-panel');
controlPanel.style['visibility'] = 'visible';

const visibilityControlClick = (event) => {
  switch(controlPanel.style['visibility']){
    case 'visible':
      controlPanel.style['visibility'] = 'hidden';
      break;

    case 'hidden':
      controlPanel.style['visibility'] = 'visible';
      break;

    default:
      break;
  }
};

const visibilityControlButton = document.querySelector('.tic-tac-toe .ttt-toggle-control-panel');

visibilityControlButton.addEventListener('click', visibilityControlClick);
