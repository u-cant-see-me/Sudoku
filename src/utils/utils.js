import { SIZE } from './constants';
//Time util
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//sudoku logic helper
export const isCurrentSectionFilled = (board, cell) => {
  const sr = cell.subGridRow;
  const sc = cell.subGridCol;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[sr + row][sc + col].value === null || board[sr + row][sc + col].wrongChoiceHighlighted === true)
        return false;
    }
  }
  return true;
};

//Random number utils
export const randBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//generates random num of clues based on level
export const getRandomClueCount = (level) => {
  switch (level.toLowerCase()) {
    case 'easy':
      return randBetween(50, 60);
    case 'medium':
      return randBetween(40, 49);
    case 'hard':
      return randBetween(35, 39);
    case 'expert':
      return randBetween(30, 34);
    case 'master':
      return randBetween(25, 29);
    case 'extreme':
      return randBetween(20, 24);
    default:
      return 36;
  }
};

//Generate all positions in 2D array
export const generateAllPositions = () =>
  Array.from({ length: SIZE }, (_, r) => Array.from({ length: SIZE }, (_, c) => ({ row: r, col: c })));

//shuffles 1D array (used in create puzzle)
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//shuffles 2D array (used in create puzzle)

export const shuffle2DArray = (positions) => {
  const shuffledCells = shuffleArray(positions.flat());

  const shuffled2DArray = [];
  for (let i = 0; i < shuffledCells.length; i += SIZE) {
    shuffled2DArray.push(shuffledCells.slice(i, i + SIZE));
  }
  return shuffled2DArray;
};
