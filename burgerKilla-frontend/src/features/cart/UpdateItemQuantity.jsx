import { TiMinus, TiPlus } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { decItemQuantity, incItemQuantity } from './cartSlice';

function UpdateItemQuantity({ quantity, itemId, onModalClose, open }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-around gap-1 px-2 py-1 bg-orange-400 border-orange-500 rounded-lg border-1">
      <button
        className="cursor-pointer"
        onClick={() => dispatch(decItemQuantity(itemId))}
      >
        <TiMinus className="w-4 h-4 sm:w-5 sm:h-5 fill-gray-50" />
      </button>
      <span className="font-sans font-bold text-center sm:text-lg text-gray-50 min-w-5">
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
        <TiPlus className="w-4 h-4 sm:w-5 sm:h-5 fill-gray-50" />
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
