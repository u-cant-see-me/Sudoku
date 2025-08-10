import { SIZE, arrayOfAllInputs } from './constants';
import countSoulutions from './countSolutions';
import examineInput from './examineInput';
import { puzzleBoard } from './initBoard';
import { generateAllPositions, shuffleArray, shuffle2DArray, getRandomClueCount, deepCloneBoard } from './utils';

const createSolvedBoard = (board) => {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col].value === null) {
        const array = shuffleArray(arrayOfAllInputs);

        for (const value of array) {
          board[row][col].value = value;

          if (examineInput(board, board[row][col], value)) {
            if (createSolvedBoard(board)) {
              return true;
            }
          } else {
            board[row][col].value = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const removeValues = (board, targetedClues) => {
  const positions = generateAllPositions(); //2D array of all positions {row,col}

  const shuffled2DArray = shuffle2DArray(positions);

  const totalCells = SIZE * SIZE;
  let currentClues = totalCells;

  for (let i = 0; i < shuffled2DArray.length; i++) {
    for (const { row, col } of shuffled2DArray[i]) {
      if (currentClues <= targetedClues) break;

      const temp = board[row][col].value;
      board[row][col].value = null;

      const solutionCount = countSoulutions(board);
      if (solutionCount != 1) {
        board[row][col].value = temp;
      } else {
        board[row][col].inputDisabled = false;
        board[row][col].isPuzzlePart = false;
        currentClues--;
      }
    }
  }
};

const createPuzzle = (level) => {
  let attempts = 10;

  let board = puzzleBoard(SIZE);

  let solvedBoard = null;

  while (attempts > 0) {
    if (createSolvedBoard(board)) {
      //fills board with valid solution
      solvedBoard = deepCloneBoard(board);
      removeValues(board, getRandomClueCount(level)); //already accounts for uniqureness
      return [board, solvedBoard]; //unique board
    }
    board = puzzleBoard(SIZE); //try a new baord
    attempts--;
  }
  console.error('couldnt build a random board');
  const nboard = puzzleBoard(SIZE);
  return [nboard, nboard];
};

export default createPuzzle;
