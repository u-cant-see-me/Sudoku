import React, { useState } from 'react'
import GameContainer from './GameComponent/GameContainer'
import LevelBar from './GameComponent/LevelBar';
import { DIFFICULTY_LEVELS } from '../utils/Constants';

const Main = () => {
    const [levels, setlevels] = useState(DIFFICULTY_LEVELS);
    const [activeLevel, setactiveLevel] = useState("Easy");
    
  return (
    <div className=' px-16 py-4'>
        <LevelBar
            levels={levels}
            activeLevel={activeLevel}
            onSelectLevel={setactiveLevel}
            />
        <GameContainer level={activeLevel}/>
    </div>
  )
}

export default Main;