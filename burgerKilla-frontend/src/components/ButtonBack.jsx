import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

function ButtonBack({ handler, updater, value }) {
  return (
    <button
      onClick={() => {
        if (value === 1) {
          handler();
        } else {
          updater(1);
        }
      }}
      className="cursor-pointer focus:outline-orange-400"
    >
      <MdOutlineKeyboardArrowLeft className="w-10 h-10 fill-orange-400" />
    </button>
  );
}

export default ButtonBack;
