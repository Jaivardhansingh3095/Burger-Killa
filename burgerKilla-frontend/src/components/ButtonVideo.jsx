import { FaPlayCircle } from 'react-icons/fa';

function ButtonVideo() {
  return (
    <button
      role="button"
      className="cursor-pointer rounded-4xl border-5 border-orange-300/70 hover:border-none transition duration-400 ease-linear"
    >
      <FaPlayCircle className="w-13 h-13 fill-orange-400 hover:w-17 hover:h-17 transition duration-400 ease-linear hover:fill-orange-500" />
    </button>
  );
}

export default ButtonVideo;
