import examineInput from './examineInput';

const size = 9;
const sudokuSolver = (board) => {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col].value === null) {
        for (let i = 1; i <= size; i++) {
          if (examineInput(board, board[row][col], i)) {
            board[row][col].value = i;
            if (sudokuSolver(board)) {
              return true;
            } else {
              board[row][col].value = null;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

export default sudokuSolver;
