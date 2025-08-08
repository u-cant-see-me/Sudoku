const Boxes = ({ onClick, boxprop }) => {
  const highlightClass = boxprop.highlighted ? 'bg-indigo-100/100' : '';
  const activeClass = boxprop.active ? 'bg-cyan-100' : '';
  const wrongChoiceHighlightClass = boxprop.wrongChoiceHighlighted ? 'bg-red-100' : '';
  const sameValueHighlightedClass = boxprop.sameValueHighlighted ? 'bg-cyan-300/50' : '';
  const isCorrectClass = boxprop.isCorrect ? 'bg-cyan-100 shadow-lg' : '';
  // const nonPuzzlePart = boxprop.isPuzzlePart?"":"text-gray-200"
  return (
    <div
      className={`
        ${activeClass ? activeClass : wrongChoiceHighlightClass || ''}
        ${highlightClass} 
        ${sameValueHighlightedClass} 
        ${isCorrectClass}
        border border-gray-400/20
        transition-all duration-100 ease-in 
        cursor-pointer text-2xl flex items-center justify-center 
        hover:bg-cyan-100 hover:shadow-xl
      `}
      onClick={onClick}
    >
      {boxprop.value}
    </div>
  );
};

export default Boxes;
