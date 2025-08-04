import { CgUndo } from 'react-icons/cg';
import { BsEraser } from 'react-icons/bs';
import { FaBrain } from 'react-icons/fa';
import Mistakes from './Mistakes';
import Timer from '../Timer';

const GameBar = ({mistakes,Undo,Erase,state,setState,resetSignal,hints,addHint}) => {




  const btnCss = `relative text-3xl bg-indigo-100 p-4 rounded-full
                    cursor-pointer text-gray-500  
                    hover:shadow-xl hover:bg-indigo-200 hover:text-black `



  const buttons = [
    {
        title:"undo",
        icon:<CgUndo/>,
        css:btnCss,
        onClick:() => Undo()

      },
    {
      title:"erase",
      icon:<BsEraser/>,
      css:btnCss,
      onClick:() => Erase()
    },
  {
    title: "hint",
    icon: (
      <>
        <FaBrain />
        <span className="absolute top-0 right-0 translate-x-[40%] -translate-y-[20%]
                        w-6 h-6 bg-gray-200 rounded-full text-xs text-indigo-500 font-bold 
                        flex items-center justify-center shadow-lg">
          {hints}
        </span>
      </>
    ),
    css: btnCss + " relative", 
    onClick: () => addHint()
  }
  ]

  return (
    <div className='flex flex-wrap sm:flex-nowrap gap-4 md:block xl:flex'>
        <div className=' flex gap-4 mb-2'>

      {
        buttons.map((btn,index) => (
          <button className={btn.css}
                  type="button"  
                  title={btn.title}
                  key={index}
                  onClick={btn.onClick}
          >{btn.icon}</button>
      ))
      }
    </div>
    <div className='flex gap-4 mb-2'>
      <Mistakes mistakes={mistakes}/>
      <Timer state={state}
            setState={setState}
            resetSignal={resetSignal}
          />
    </div>
    </div>

  )
}

export default GameBar