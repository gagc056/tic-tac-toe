const drawGrid = (context, x, y, sideLength) => {
  const innerLength = sideLength / 3;

  context.beginPath();

  context.moveTo(x, y + innerLength);
  context.lineTo(x + sideLength, y + innerLength);

  context.moveTo(x, y + (2 * innerLength));
  context.lineTo(x + sideLength, y + (2 * innerLength));

  context.moveTo(x + innerLength, y);
  context.lineTo(x + innerLength, y + sideLength);

  context.moveTo(x + (2 * innerLength), y);
  context.lineTo(x + (2 * innerLength), y + sideLength);

  context.stroke();
};

const drawO = (context, centerX, centerY, sideLength, margin) => {
  const radius = (sideLength / 6) - (2 * margin);

  context.beginPath();

  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.stroke();
};

const drawX = (context, centerX, centerY, sideLength, margin) => {
  const offset = (sideLength / 6) - (2 * margin);

  context.beginPath();

  context.moveTo(centerX - offset, centerY - offset);
  context.lineTo(centerX + offset, centerY + offset);

  context.moveTo(centerX + offset, centerY - offset);
  context.lineTo(centerX - offset, centerY + offset);

  context.stroke();
};

const centerFor = (index, originX, originY, sideLength) => {
  const realIndex = index - 1;
  const innerLength = sideLength / 3;
  const offset = innerLength / 2;

  const row = Math.trunc(realIndex / 3);
  const column = realIndex % 3;

  const centerX = originX + (innerLength * column) + offset;
  const centerY = originY + (innerLength * row) + offset;

  return [centerX, centerY];
};

const drawBoard = (context, x, y, sideLength, board, innerMargin) => {
  drawGrid(context, x, y, sideLength);

  for (let i = 1; i <= 9; i += 1) {
    const [centerX, centerY] = centerFor(i, x, y, sideLength);

    const mark = board.getMarkAt(i);
    switch (mark) {
      case 'X':
        drawX(context, centerX, centerY, sideLength, innerMargin);
        break;

      case 'O':
        drawO(context, centerX, centerY, sideLength, innerMargin);
        break;

      default:
        break;
    }
  }
};

class Display {
  constructor(canvas, layout, statusBar) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.layout = layout;
    this.statusBar = statusBar;
  }

  clear() {
    this.statusBar.innerText = '';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  presentStatus(text) {
    this.statusBar.innerText = text;
  }

  presentBoard(board) {
    const { outerMargin, innerMargin, lineWidth } = this.layout;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const shorterSide = Math.min(this.canvas.width, this.canvas.height);

    const sideLength = shorterSide - (2 * this.layout.outerMargin);
    const originX = ((this.canvas.width - shorterSide) / 2) + this.layout.outerMargin;
    const originY = ((this.canvas.height - shorterSide) / 2) + this.layout.outerMargin;

    this.context.lineWidth = lineWidth;

    drawBoard(this.context, originX, originY, sideLength, board, innerMargin);
  }
}

const displayFactory = (canvas, layout, statusBar) => new Display(canvas, layout, statusBar);

export default displayFactory;
