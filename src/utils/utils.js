export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const isCurrentSectionFilled = (board,cell) => {
    const sr = cell.subGridRow;
    const sc = cell.subGridCol;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if(board[sr + row][sc + col].value === null || 
          board[sr + row][sc + col].wrongChoiceHighlighted === true) return false;
      }      
    }
    return true;
  }