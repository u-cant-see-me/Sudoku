//highlight current rows , columns and the current 3x3 grid

const size = 9;
export const highlight = (board, r, c) => {
  let updatedArr = board.map((row) =>
    row.map((cell) => ({
      ...cell,
      highlighted: false,
      active: false,
      sameValueHighlighted: false,
    }))
  );
  let sr, sc;
  //highlight sections
  sr = updatedArr[r][c].subGridRow;
  sc = updatedArr[r][c].subGridCol;

  for (let i = 0; i < size; i++) {
    //highlight rows and cols
    updatedArr[r][i].highlighted = true;
    updatedArr[i][c].highlighted = true;
    updatedArr[Math.floor(i / 3) + sr][(i % 3) + sc].highlighted = true;
  }
  updatedArr[r][c].highlighted = false;
  updatedArr[r][c].active = true;

  return updatedArr;
};
