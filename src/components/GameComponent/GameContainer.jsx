import React, { useState ,useEffect, useRef} from 'react'
import { GameBoard } from './GameBoard'
import GameControls from './GameControls/GameControls'
import examineInput, { highlightMatchingValues, highlightWrongCells } from '../../utils/examineInput';
import Stack from '../../utils/stack';
import { highlight } from '../../utils/highlight';
import initBoard from '../../utils/initBoard';
import createPuzzle from '../../utils/createPuzzle';
import {wait,isCurrentSectionFilled} from '../../utils/utils';
import ContainerOverlay from './ContainerOverlay';
import sudokuSolver from '../../utils/sudokuSolver';
import { SIZE } from '../../utils/constants';

const GameContainer = ({level}) => {

    const [currentGameState,setCurrentGameState] = useState("play");
    const [board, setboard] = useState([]);
    const [activeCell, setactiveCell] = useState(null);
    const [mistakes ,setMistakes] = useState(0);
    const [resetSignal, setResetSignal] = useState(0);
    const [result, setResult] = useState(null);
    const [hints, setHints] = useState(3);
    const [solutionUsed, setSolutionUsed] = useState(false);

    const cellStackRef = useRef(new Stack());
    const savedBoardState = useRef(initBoard(SIZE));

    // const scoreStateStack = useRef(new Stack());

    

    useEffect(() => {
      if(currentGameState === "pause"){
        if (board?.flat().some(cell => cell.value !== null)) {
          savedBoardState.current = board;
        }
        savedBoardState.current = board;
        setboard(initBoard(SIZE))
      }
      else{
        setboard(savedBoardState.current);
      }
    },[currentGameState]);


    const restartGame = () => {
      const newBoard = initBoard(SIZE);

      setboard(newBoard);

      cellStackRef.current.clear();
      setactiveCell(null);
      setMistakes(0);
      setResetSignal(prev => prev+1);
      setHints(3);
      setResult(null);
      setSolutionUsed(false);
      addPuzzle();
      setCurrentGameState("play");
    }

    useEffect(() => {
      restartGame()
    },[level]);
      
    useEffect(() => {
      if((mistakes/2)>= 5){
        savedBoardState.current = board;
        setResult("lost");       
        setCurrentGameState("over");
      }
    },[mistakes])
      


    const updateBoard = (inputValue,undoValue = false,isErased = false,altCell) => {

      let cell = activeCell;
      if(altCell){
        cell = altCell;
      }

      if(cell && !cell.inputDisabled  && inputValue !== undefined)
        {         

        const cellStackTop = cellStackRef.current.peek();

        if(cellStackTop && !undoValue && !cellStackTop.isErased &&
          cellStackTop.row === cell.row &&            //ensures no refiling of same value at same spot (with no intermediatary moves)
          cellStackTop.col === cell.col &&            //so cellStack dont get filled with same value and upon popping
          cellStackTop.value === inputValue ) return;  // wont have to see same value repeatedly appear at same spot 

        if(undoValue && !cellStackRef.current.isEmpty() && cellStackTop.isErased){
          cell = cellStackRef.current.pop();
        }

        if(!undoValue){
          cellStackRef.current.push((isErased)?{...cell,isErased:true}:{...cell,value:inputValue});
        }

        setboard(prevBoard => {
          const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));


          const isSafe = examineInput(prevBoard,cell,inputValue);

          if(!isSafe && !undoValue) updateMistakes();

          newBoard[cell.row][cell.col].value = inputValue;

          cell = newBoard[cell.row][cell.col];

          const isFilled = highlightMatchingValues(newBoard,cell);

          highlightWrongCells(newBoard,cell);
          
          newBoard[cell.row][cell.col].wrongChoiceHighlighted = (!isSafe)?true:false;

          if(isSafe && isCurrentSectionFilled(newBoard,cell) && inputValue !== null) highlightCurrentSection(cell);
          
          if(isSafe && isFilled && !solutionUsed) {
            savedBoardState.current = newBoard;
            victoryBoard();
            setTimeout(() => {
              setCurrentGameState("over");
              setResult("won");  
              }, 3000);

          }

        return newBoard;
        });
      }
    }

  const updateMistakes = () => {
      setMistakes(prev => prev + 1);
    }

  const Erase = () => {
    if(activeCell.value !== null){
      updateBoard(null,false, true);  
    }    
  }

  const Undo = () => {
    if(!cellStackRef.current.isEmpty()){

      const currentCell = cellStackRef.current.pop();
      if(cellStackRef.current.isEmpty()){
        updateBoard(null,true,currentCell.isErased,currentCell);
        setboard(prev => highlight(prev, currentCell.row, currentCell.col));
        setactiveCell(currentCell);

      }
      else{
        if(currentCell.isErased){
            cellStackRef.current.push(currentCell);
            setactiveCell(currentCell);
            setboard(prev => highlight(prev, currentCell.row, currentCell.col));
            updateBoard(currentCell.value,true);
        }
        else{
          const prevCell = cellStackRef.current.peek();
          if(prevCell.row != currentCell.row || prevCell.col != currentCell.col ){
            updateBoard(null,true,false,currentCell);
            setactiveCell(prevCell);
            setboard(prev => highlight(prev, prevCell.row, prevCell.col));

          }
          else{
            updateBoard(prevCell.value, true,false,prevCell);
            setactiveCell(prevCell);
            setboard(prev => highlight(prev, prevCell.row, prevCell.col));
            }
          }

        }
    }
  }



  const highlightCurrentSection = async (cell) => {
    const sr = cell.subGridRow;
    const sc = cell.subGridCol;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {

         setboard(prevBoard => {

          const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));

          if(row < 3){
              newBoard[sr + row][sc + col].highlighted = false;
              newBoard[sr + row][sc + col].isCorrect = true;
          }
          if(row > 0 ){
            newBoard[sr + row-1][sc + col].highlighted = true;
            newBoard[sr + row-1][sc + col].isCorrect = false;
          }

          if(row === 3 && col === 2){
            newBoard[cell.row][cell.col].highlighted = false;
            newBoard[cell.row][cell.col].active = true;            
          }
          return newBoard;
          });
          
          await wait(100);
      }      
    }
  }

  const victoryBoard = async () => {
    for (let row = 0; row < SIZE + 1; row++) {
      for (let col = 0; col < SIZE; col++) {

         setboard(prevBoard => {

          const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));

          if(row < SIZE){
            newBoard[row][col].highlighted = false;
            newBoard[row][col].isCorrect = true;

            newBoard[row][col].sameValueHighlighted = false;
            newBoard[row][col].active = false;
          }
          if(row > 0 ){
            newBoard[row-1][col].isCorrect = false;
          }

          return newBoard;
          });
          
          await wait(30);
      }      
    }
  }

  const addHint = () => {
    if(hints <= 0) return;
    
    setHints(prev => prev - 1);
    let cell ;
    const clonedBoard = board.map(row => row.map(cell => ({...cell})))
    if(activeCell && (activeCell.value === null || activeCell.wrongChoiceHighlighted)){
      cell = activeCell;
      if(clonedBoard[cell.row][cell.col].wrongChoiceHighlighted ){
        clonedBoard[cell.row][cell.col].value = null;
      }
    }
    else{
      for (let row = 0; row < SIZE ; row++) {
        for (let col = 0; col < SIZE; col++) {   
          if(clonedBoard[row][col].value === null){
            cell = clonedBoard[row][col];
            break;
          }
        }
      }
  }
  
  sudokuSolver(clonedBoard);
  setactiveCell({...cell,value:clonedBoard[cell.row][cell.col].value});
  setboard(prev => highlight(prev,cell.row,cell.col))
  updateBoard(clonedBoard[cell.row][cell.col].value,false,false,cell);


}

  const addPuzzle = async () => {
    const puzzle = await getPuzzle();
    savedBoardState.current = puzzle;
    setboard(puzzle);
  }

  const getPuzzle = () => {
    return new Promise((resolve) => {
      resolve(createPuzzle(level))
    })
  }

  return (
    <div className='relative grid grid-cols-[60%_40%] 
                    lg:w-[80%] lg:pr-40 pt-2'>
        <GameBoard
        activeCell={activeCell}
        setactiveCell={setactiveCell}
        setboard={setboard}
        board={board}
        state={currentGameState}
        setState={setCurrentGameState}
        />
        <GameControls 
        activeCell={activeCell}
        mistakes={mistakes}
        updateBoard={updateBoard}
        Undo={Undo}
        Erase={Erase}
        state={currentGameState}
        setState={setCurrentGameState}
        restartGame={restartGame}
        resetSignal={resetSignal}
        hints = {hints}
        addHint={addHint}

        />
        {
          currentGameState === "over" &&
          <ContainerOverlay 
          result={result}
          setState={setCurrentGameState}
          setboard={setboard}
          savedBoardState={savedBoardState}
          restartGame={restartGame}
          setSolutionUsed={setSolutionUsed}
          />

        }
    </div>
  )
}

export default GameContainer;