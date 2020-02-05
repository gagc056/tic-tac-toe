import  boardFactory  from '../lib/board';

test('expects boardFactory method to exist on module', () => {
  expect(typeof boardFactory).toBe('function');
});

test('expects a new board to have these methods', () => {
  const board = boardFactory();
  expect(typeof board.setMarkAt).toBe('function');
  expect(typeof board.getMarkAt).toBe('function');
  expect(typeof board.hasWinner).toBe('function');
});

test('expects a new board to be fully empty', () => {
  const board = boardFactory();
  for (let i = 1; i <= 9; i += 1) {
    expect(board.getMarkAt(i)).toBe(null);
  }
});

test('expects the impossibility of playing in an occupied position', () => {
  const board = boardFactory();

  let mark = 'X';
  for (let i = 1; i <= 9; i += 1) {
    expect(board.setMarkAt(i, mark)).toBe(true);
    expect(board.setMarkAt(i, mark)).toBe(false);
    mark = mark === 'X' ? 'O' : 'X';
  }
});

test('expects a played board to detect winners', () => {
  const boardA = boardFactory();
  expect(boardA.hasWinner()).toBe(null);

  boardA.setMarkAt(1, 'X');
  boardA.setMarkAt(4, 'O');
  boardA.setMarkAt(2, 'X');
  boardA.setMarkAt(5, 'O');
  boardA.setMarkAt(3, 'X');
  expect(boardA.hasWinner()).toBe('X');

  const boardB = boardFactory();
  expect(boardB.hasWinner()).toBe(null);

  boardB.setMarkAt(1, 'X');
  boardB.setMarkAt(2, 'O');
  boardB.setMarkAt(3, 'X');
  boardB.setMarkAt(5, 'O');
  boardB.setMarkAt(4, 'X');
  boardB.setMarkAt(8, 'O');
  expect(boardB.hasWinner()).toBe('O');
});
