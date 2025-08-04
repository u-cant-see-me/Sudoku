const scoreState = () => {
    return {
            correctInputs: 0,
            wrongInputs: 0,
            hintsUsed: 0,
            undoCount: 0,
            rowColGridBonuses: 0,
            timeTaken: 0, // in seconds
            // puzzleLevel:""
            totalScore: 0,
        };
}

export default scoreState;