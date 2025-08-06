import examineInput from "./examineInput";
import { puzzleBoard } from "./initBoard"

const size = 9;

const shuffleArray = () => {
    const array = Array.from({length:size},(_,i) => i+1);
    for(let i = array.length - 1 ; i >=  0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i],array[j]] = [array[j],array[i]];
    }
    return array;
}

const createSolvedBoard = (board) => {

    for(let row = 0;row < size ; row++){
        for(let col = 0; col < size ;col++){

            if(board[row][col].value === null){

                const array = shuffleArray();

                for(const value of array){
                    board[row][col].value = value;

                    if(examineInput(board,board[row][col],value)){
                        if(createSolvedBoard(board)){
                            return true;
                        }
                    }
                    else{
                        board[row][col].value = null;
                    }

                }
                return false;

            }

        }
    }
    return true;
}

const randBetween = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomClueCount = (level) => {
    switch (level.toLowerCase()) {
        case "easy":return randBetween(50,60);
        case "medium":return randBetween(40,49);
        case "hard":return randBetween(35,39);
        case "expert":return randBetween(30,34);
        case "master":return randBetween(25,29);
        case "extreme":return randBetween(20,24);
        default:return 36;
    }
}

const removeValues = (board,clues) => {
    const totalCells = size*size;
    let cellsToRemove = totalCells - clues;
    let attempts = 200;
    let removed = 0;

    while( removed < cellsToRemove && attempts > 0 ){

        const r =  Math.floor(Math.random() * size);
        const c =  Math.floor(Math.random() * size);

        if(board[r][c].value !== null){
            board[r][c].value = null;
            board[r][c].inputDisabled = false;
            board[r][c].isPuzzlePart = false;
            removed++;
        }
        else{
            attempts--;
        }
    }

    if (removed < cellsToRemove) {
        console.warn(`Could only remove ${removed} cells out of ${cellsToRemove}`);
    }
}

const createPuzzle = (level) => {

    let attempts = 5;

    let board = puzzleBoard(size);

    while(attempts > 0){
        if(createSolvedBoard(board)){
            removeValues(board,getRandomClueCount(level));
            return board;
        }
        board = puzzleBoard(size);
        attempts--;
    }
    console.error("couldnt build a random board");
    return puzzleBoard(size);
}




export default createPuzzle;