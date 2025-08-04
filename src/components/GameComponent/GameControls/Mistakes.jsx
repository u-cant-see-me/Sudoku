import React from 'react'

const Mistakes = ({mistakes}) => {
  return (
    <div >
        <p className='text-md text-gray-500 font-bold'>Mistakes</p>
        <p className='text-md text-gray-500 font-bold text-center'>{(mistakes/2) >= 5?"4":(mistakes/2) }/5</p>
    </div>

  )
}

export default Mistakes