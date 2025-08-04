import React from 'react'

const LevelBar = ({levels,activeLevel,onSelectLevel}) => {
  return (
    <div className='flex items-center  gap-2 mb-4'>
      <p className=' text-xl text-indigo-500/80'>Difficulty :</p>
      {
        levels.map((level,index) => (

          <button
            key={index}
            className= {`cursor-pointer hover:bg-indigo-200/50 py-2 px-1 rounded hover:shadow-sm
                        text-gray-400 font-bold  ${(activeLevel === level)?"bg-indigo-100 ":""}`}
            type="button"
            onClick={() => onSelectLevel(level)
            }
            >{level}</button> 
        ))
      }
    </div>
  )
}

export default LevelBar;