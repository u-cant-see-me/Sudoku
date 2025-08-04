import React from 'react'
import sudokuSolver from '../../utils/sudokuSolver';

const ContainerOverlay = ({result,setState,setboard,savedBoardState,restartGame,setSolutionUsed}) => {

  
  const getSolved = () => {
    setSolutionUsed(true);
    setboard(prevBoard => {
      const clonedBoard = prevBoard.map(row => row.map(cell => {
        cell.highlighted = false;
        if(cell.value !== null && 
          cell.wrongChoiceHighlighted && !cell.inputDisabled) cell.value = null;
        cell.wrongChoiceHighlighted = false;
        cell.sameValueHighlighted = false;
        return (cell.value === null)?{...cell,highlighted:true}:{ ...cell }
      }));
      sudokuSolver(clonedBoard);
      savedBoardState.current = clonedBoard;
      return clonedBoard;
    });
    setState("continue")
  };

  const btns = [
    {
      text:"Solution",
      onClick:() => {getSolved()}
    },
    {
      text:"Second Chance",
      onClick:() => {setState("play")}
    }
  ]
  return (
    <div className='absolute h-full w-full  z-[101]
                    bg-gray-200/50 flex  justify-center 
    '>
      <div className='h-1/2 w-1/2 bg-indigo-100 p-4 mt-6 rounded-md shadow-2xl'>
          <p className='text-center text-2xl font-bold'>{result === "won"?"YOU WIN!!!":"Game Over"}</p>
          {result === "lost" && <p className='text-center text-white text-lg bg-red-400'>You lost the game</p>}
          <div className='flex gap-4 justify-center mt-4 font-bold text-lg text-indigo-200'>
            { result === "lost" &&
              btns.map((btn,key) => (
                <button type="button" key={key} 
                        onClick={btn.onClick}
                        className='cursor-pointer py-4 px-2 bg-white rounded-md hover:shadow-lg'
                >{btn.text}</button>
            ))
          }
          {
            result === "won" && 
            <button type="button"
                    className='cursor-pointer py-4 px-2 bg-white rounded-md hover:shadow-lg'
                    onClick={() => restartGame()}
            >New Game</button>
          }

          </div>

      </div>
    </div>
  )
}

export default ContainerOverlay;