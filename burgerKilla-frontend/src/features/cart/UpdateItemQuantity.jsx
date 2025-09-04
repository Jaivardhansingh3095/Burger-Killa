import { TiMinus, TiPlus } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { decItemQuantity, incItemQuantity } from './cartSlice';

function UpdateItemQuantity({ quantity, itemId, onModalClose, open }) {
  const dispatch = useDispatch();
  return (
    <div className="border-1 border-orange-500 bg-orange-400 flex justify-around items-center gap-1 py-1 px-2 rounded-[10px]">
      <button
        className="cursor-pointer"
        onClick={() => dispatch(decItemQuantity(itemId))}
      >
        <TiMinus className="fill-gray-50 h-5 w-5" />
      </button>
      <span className="font-sans font-bold text-[1.1rem] text-gray-50 min-w-5 text-center">
        {quantity}
      </span>
      <button
        className="cursor-pointer"
        onClick={() => {
          if (open) {
            onModalClose();
            return;
          }
          dispatch(incItemQuantity(itemId));
        }}
      >
        <TiPlus className="fill-gray-50 h-5 w-5" />
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
