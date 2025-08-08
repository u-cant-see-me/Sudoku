import React, { useEffect, useState, useRef } from 'react';
import { AiOutlinePause } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';

const Timer = ({ state, setState, resetSignal }) => {
  const intervalRef = useRef(0);
  const interval = 1000;
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(0);
  }, [resetSignal]);

  useEffect(() => {
    if (state === 'play') {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, interval);
    } else {
      clearInterval(intervalRef.current);
    }
    // if we dont remove it after some render it will double it will value
    return () => clearInterval(intervalRef.current);
  }, [state]);

  function secondsToTime(seconds) {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [mins.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':');
  }

  return (
    <div className="flex ">
      <div className="text-md font-bold text-gray-500">
        <p>Time</p>
        <p>{secondsToTime(time)}</p>
      </div>

      <button
        className="h-8 w-8 cursor-pointer  bg-indigo-100 shadow-xl hover:bg-indigo-200
                  flex items-center justify-center rounded-full m-2"
        type="button"
        onClick={() => state !== 'continue' && setState((prev) => (prev === 'play' ? 'pause' : 'play'))}
      >
        {state === 'play' ? <AiOutlinePause /> : <BsFillPlayFill />}
      </button>
    </div>
  );
};

export default Timer;
