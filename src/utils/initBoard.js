const initBoard = (size) => {
    return Array.from({length:size} ,
                            (_,r) => Array.from({length:size},
                              (_,c) => ({
                                row:r,
                                col:c,
                                value:null,
                                subGridRow:(r < 3)?0:(r >= 3 && r < 6)?3:6,//first row of each subgrid
                                subGridCol:(c < 3)?0:(c >= 3 && c < 6)?3:6,//first col of each subgrid
                                active:false,
                                highlighted:false,
                                sameValueHighlighted:false,
                                wrongChoiceHighlighted:false,
                                inputDisabled:false,
                                isErased:false,
                                isCorrect:false
                            })));
}

export const puzzleBoard = (size) => {
      return Array.from({length:size} ,
                            (_,r) => Array.from({length:size},
                              (_,c) => ({
                                row:r,
                                col:c,
                                value:null,
                                subGridRow:(r < 3)?0:(r >= 3 && r < 6)?3:6,//first row of each subgrid
                                subGridCol:(c < 3)?0:(c >= 3 && c < 6)?3:6,//first col of each subgrid
                                active:false,
                                highlighted:false,
                                sameValueHighlighted:false,
                                wrongChoiceHighlighted:false,
                                inputDisabled:true,
                                isErased:false,
                                isPuzzlePart:true,
                                isCorrect:false
                            })));

}
export default initBoard;
