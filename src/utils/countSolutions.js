import examineInput from './examineInput';
import { SIZE } from './constants';

const countSoulutions = (board) => {
  let numOfSolutions = 0;

  const solve = (limit = 2) => {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col].value === null) {
          for (let val = 1; val <= SIZE; val++) {
            if (examineInput(board, board[row][col], val)) {
              board[row][col].value = val;
              solve(limit);
              board[row][col].value = null;

              if (numOfSolutions >= limit) return;
            }
          }
          return;
        }
      }
    }
    numOfSolutions++;
  };

  solve();
  return numOfSolutions;
};

export default countSoulutions;
