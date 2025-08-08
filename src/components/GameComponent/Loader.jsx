import { GridLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="absolute h-full w-full bg-gray-200/60 flex items-center justify-center">
      <GridLoader color="#161c3aff" />
    </div>
  );
};

export default Loader;
