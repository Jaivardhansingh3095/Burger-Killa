import UpdateItemQuantity from './UpdateItemQuantity';
import { BiCheckboxSquare } from 'react-icons/bi';
import { BiCaretUpSquare } from 'react-icons/bi';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ item }) {
  return (
    <div className="w-full px-1 py-2 bg-white  inset-shadow-[1px_1px_8px_-4px] inset-shadow-gray-400 border-1 border-gray-200 rounded-[5px] font-sans flex flex-col justify-start items-center gap-3">
      <div
        className={`flex justify-start items-center w-full border-gray-400 py-2 ${item.addOns?.length ? 'border-b-1 border-dashed' : ''}`}
      >
        <div className="flex flex-col items-start justify-start mr-auto">
          <div className="flex items-center justify-start gap-1">
            {item.foodType === 'veg' ? (
              <BiCheckboxSquare className="w-5 h-5 fill-teal-700/90" />
            ) : (
              <BiCaretUpSquare className="h-5 w-5 p-[2px] fill-red-700/85" />
            )}
            <p className="text-[.80rem] text-gray-700 font-semibold">
              {item.name}
            </p>
          </div>
          <p className="font-sans font-semibold text-gray-600 text-[.85rem] w-full ml-2 flex justify-start items-center gap-2 ">
            <span>{item.quantity}</span>x
            <span>{formatCurrency(item.price)}</span>
            <span className="text-[.90rem] text-gray-700">
              {formatCurrency(item.price * 2)}
            </span>
          </p>
        </div>
        <UpdateItemQuantity quantity={item.quantity} itemId={item.itemId} />
      </div>
      <ul className="flex flex-col items-center justify-center w-full gap-2">
        {item.addOns.map((addon) => (
          <li
            key={addon._id}
            className="flex items-center justify-start w-full"
          >
            <span className="flex items-center justify-start gap-2 mr-auto">
              {addon.foodType === 'veg' ? (
                <BiCheckboxSquare className="w-5 h-5 fill-teal-700/90" />
              ) : (
                <BiCaretUpSquare className="h-5 w-5 p-[2px] fill-red-700/85" />
              )}
              <span className="flex flex-col justify-start items-start text-[.80rem] font-semibold">
                <span>ADD ON {addon.categories.toUpperCase()}:</span>
                <span>{addon.name}</span>
              </span>
            </span>
            <span className="mr-4 text-[.9rem] font-semibold text-gray-600">
              {formatCurrency(item.quantity * addon.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartItem;
