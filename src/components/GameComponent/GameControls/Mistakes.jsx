import { maxMistakes } from '../../../utils/constants';

const Mistakes = ({ mistakes }) => {
  return (
    <div>
      <p className="text-md text-gray-500 font-bold">Mistakes</p>
      <p className="text-md text-gray-500 font-bold text-center">
        {mistakes >= maxMistakes ? maxMistakes - 1 : mistakes}/{maxMistakes}
      </p>
    </div>
  );
};

export default Mistakes;
