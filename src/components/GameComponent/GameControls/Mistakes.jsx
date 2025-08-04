const Mistakes = ({mistakes}) => {
  return (
    <div >
        <p className='text-md text-gray-500 font-bold'>Mistakes</p>
        <p className='text-md text-gray-500 font-bold text-center'>{(mistakes) >= 5?"4":(mistakes) }/5</p>
    </div>

  )
}

export default Mistakes