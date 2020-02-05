const isInsideRectangle = (rectangle, x, y) => {
  const {
    x1, y1,
    x2, y2,
  } = rectangle;

  return (x1 <= x && x < x2 && y1 <= y && y < y2);
};

function canvasMouseUp(event) {
  if (this.onPlayMove === null) {
    return;
  }

  const { offsetX } = event;
  const { offsetY } = event;
  const { offsetWidth } = event.target;
  const { offsetHeight } = event.target;

  const { outerMargin } = this.layout;

  const shorterSide = Math.min(offsetWidth, offsetHeight);

  const sideLength = shorterSide - (2 * outerMargin);
  const originX = ((offsetWidth - shorterSide) / 2) + outerMargin;
  const originY = ((offsetHeight - shorterSide) / 2) + outerMargin;
  const beyondX = originX + sideLength;
  const beyondY = originY + sideLength;

  const greaterRectangle = {
    x1: originX,
    y1: originY,
    x2: beyondX,
    y2: beyondY,
  };

  if (!isInsideRectangle(greaterRectangle, offsetX, offsetY)) {
    return;
  }

  const innerLength = sideLength / 3;

  for (let position = 1; position <= 9; position += 1) {
    const realPosition = position - 1;
    const row = Math.trunc(realPosition / 3);
    const column = realPosition % 3;

    const startX = originX + (column * innerLength);
    const startY = originY + (row * innerLength);
    const endX = originX + ((column + 1) * innerLength);
    const endY = originY + ((row + 1) * innerLength);

    const rectangle = {
      x1: startX,
      y1: startY,
      x2: endX,
      y2: endY,
    };

    if (isInsideRectangle(rectangle, offsetX, offsetY)) {
      this.onPlayMove(position);
      return;
    }
  }
}

class Events {
  constructor(canvas, layout) {
    this.canvas = canvas;
    this.layout = layout;
    this.onPlayMove = null;

    const handler = canvasMouseUp.bind(this);
    canvas.addEventListener('mouseup', handler);
  }
}

const eventsFactory = (canvas, layout) => new Events(canvas, layout);

export default eventsFactory;
