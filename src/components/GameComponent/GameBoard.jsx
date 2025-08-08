import Boxes from './Boxes';
import BoardOverlay from './BoardOverlay';
import { highlightMatchingValues } from '../../utils/examineInput';
import { highlight } from '../../utils/highlight';

export const GameBoard = ({ setactiveCell, state, setState, board, setboard }) => {
  const highlightCells = (board, r, c) => {
    let updatedArr = highlight(board, r, c);
    if (board[r][c].value != null || board[r][c].value != undefined) {
      highlightMatchingValues(updatedArr, updatedArr[r][c]);
    }
    setactiveCell(updatedArr[r][c]);
    setboard(updatedArr);
  };

  return (
    <div
      className="relative h-100
                sm:h-118 xl:h-112 md:mr-4"
    >
      <div
        className="h-full w-full grid grid-cols-9 grid-rows-9 
                border-2 border-black
                z-[99]"
      >
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Boxes
              key={`${rowIndex}-${colIndex}`}
              onClick={() => highlightCells(board, rowIndex, colIndex)}
              boxprop={value}
            />
          ))
        )}
      </div>
      <BoardOverlay state={state} setState={setState} />
    </div>
  );
};
