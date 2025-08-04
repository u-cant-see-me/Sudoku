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
        case "easy":return randBetween(35,50);
        case "medium":return randBetween(34,38);
        case "hard":return randBetween(30,33);
        case "expert":return randBetween(24,29);
        case "master":return randBetween(17,23);
        case "extreme":return randBetween(10,16);
        default:return 36;
    }
}

const removeValues = (board,clues) => {
    const totalCells = size*size;
    let clueCells = totalCells - clues;

    while( clueCells > 0 ){

        const r =  Math.floor(Math.random() * size);
        const c =  Math.floor(Math.random() * size);

        if(board[r][c].value !== null){
            board[r][c].value = null;
            board[r][c].inputDisabled = false;
            board[r][c].isPuzzlePart = false;
        }
        clueCells--
    }
}

const createPuzzle = (level) => {

    const board = puzzleBoard(size);

    createSolvedBoard(board);

    removeValues(board,getRandomClueCount(level));
    
    return board;


}




export default createPuzzle;