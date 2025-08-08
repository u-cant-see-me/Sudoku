import { SIZE } from './constants';

const examineInput = (board, cell, value) => {
  if (value === null) return true;
  const r = cell.row;
  const c = cell.col;

  //highlight sections

  for (let i = 0; i < SIZE; i++) {
    let sr = Math.floor(i / 3) + cell.subGridRow;
    let sc = (i % 3) + cell.subGridCol;

    let isSameRC = sr === r && sc === c;

    //check if same value in the actice row or col, leaving active cell
    if (
      (i != c && board[r][i].value == value) ||
      (i != r && board[i][c].value == value) ||
      (!isSameRC && board[sr][sc].value == value)
    ) {
      //leaves active row and col
      return false;
    }
  }
  return true;
};

export const highlightMatchingValues = (board, cell) => {
  const r = cell.row;
  const c = cell.col;
  let isFilled = true;
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (cell.value !== null && i != r && j != c && board[i][j].value == cell.value) {
        board[i][j].sameValueHighlighted = true;
      } else {
        board[i][j].sameValueHighlighted = false;
      }

      if (board[i][j].value === null || board[i][j].wrongChoiceHighlighted) isFilled = false;
    }
  }
  return isFilled;
};

const isInvalid = (board, cell) => {
  return !examineInput(board, cell, cell.value);
};

export const highlightWrongCells = (board, cell) => {
  const r = cell.row;
  const c = cell.col;
  const value = cell.value;

  for (let i = 0; i < SIZE; i++) {
    let sr = Math.floor(i / 3) + cell.subGridRow;
    let sc = (i % 3) + cell.subGridCol;
    let isSameRC = sr === r && cell.sc === c;
    //highlight
    if (board[r][i].value === value) {
      board[r][i].wrongChoiceHighlighted = isInvalid(board, board[r][i]);
    }
    //dehilight if highlighted and not matched with active cell
    if (board[r][i].wrongChoiceHighlighted && board[r][i].value != value) {
      //dehilight only if no other math is present in the r/c/subgrid
      board[r][i].wrongChoiceHighlighted = isInvalid(board, board[r][i]);
    }

    if (board[i][c].value == cell.value) {
      board[i][c].wrongChoiceHighlighted = isInvalid(board, board[i][c]);
    }
    if (board[i][c].wrongChoiceHighlighted && board[i][c].value != value) {
      board[i][c].wrongChoiceHighlighted = isInvalid(board, board[i][c]);
    }
    if (!isSameRC && board[sr][sc].value == value) {
      board[sr][sc].wrongChoiceHighlighted = isInvalid(board, board[sr][sc]);
    }
    if (board[sr][sc].wrongChoiceHighlighted && board[sr][sc].value != value) {
      board[sr][sc].wrongChoiceHighlighted = isInvalid(board, board[sr][sc]);
    }
  }

  return board;
};

export default examineInput;
