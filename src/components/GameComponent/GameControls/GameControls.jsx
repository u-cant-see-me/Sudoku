import NewGameBtn from './NewGameBtn'
import GameBar from './GameBar'
const GameControls = ({updateBoard,mistakes,Undo,Erase,
                        state,setState,restartGame,resetSignal,
                        hints,addHint
                    }) => {
  return (
    <div className='h-full '>
        <GameBar mistakes ={mistakes}
                Undo={Undo}
                Erase={Erase}
                state={state}
                setState={setState}
                resetSignal={resetSignal}   
                hints={hints}
                addHint={addHint}
        />
        <div className='grid grid-cols-3 grid-row-3 gap-2'>
            {
                Array.from({length:9},(_,i) => (
                    <div key={i}
                        className='text-3xl rounded cursor-pointer
                                    flex items-center justify-center
                                    bg-indigo-100 py-6
                                    hover:shadow-xl hover:bg-indigo-300/50 hover:text-black'
                        onClick={() => updateBoard(i+1)}>
                        {i+1}
                    </div>
                ))
            }
        </div>
            <NewGameBtn restartGame={restartGame}/>
    </div>
  )
}

export default GameControls