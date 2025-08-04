const NewGameBtn = ({restartGame}) => {
  return (
    <button type="button"
            className='w-full text-2xl bg-indigo-100 py-4 px-2 rounded 
            cursor-pointer font-bold text-gray-500 my-4
            hover:shadow-xl  hover:bg-indigo-300/50
            '
            onClick={() => restartGame()}
    >
        New Game
    </button>
  )
}

export default NewGameBtn