import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs';
import { SIZE } from '../../utils/constants';  

const SectionGridOverlay = ({state,setState}) => {

  return (
      <div className={`absolute h-full w-full  top-0
                      grid grid-cols-3 grid-rows-3
                      z-[100] ${state === "play"?"pointer-events-none":""}
      `}>
        {Array.from({ length: SIZE }, (_, i) => (
          <div key={i} className=" border border-1 border-black"></div>
        ))}

        {state === "pause" &&
            <button type='button'
              onClick={() => setState("play")}
              className='absolute h-1/2 w-1/2 top-1/4 left-1/4 
                            flex items-center justify-center
                            text-8xl text-indigo-500/60 cursor-pointer'>

              <BsFillPlayFill/>
            </button>}
      </div>  
    )
}

export default React.memo(SectionGridOverlay);