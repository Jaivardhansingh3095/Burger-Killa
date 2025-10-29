import { RiEBike2Fill } from 'react-icons/ri';
import { CiCircleInfo } from 'react-icons/ci';
import { BiCaretUpSquare, BiCheckboxSquare } from 'react-icons/bi';

import { selectCart, selectTotalPrice } from '../../cart/cartSlice';
import { useSelector } from 'react-redux';

import {
  DELIVERY_CHARGES_PER_KM,
  formatCurrency,
  GST_CHARGES,
} from '../../../utils/helpers';

function FinalOrderDraft({ delAddress }) {
  const cart = useSelector(selectCart);
  const totalCartPrice = useSelector((state) => selectTotalPrice(state));

  return (
    <div className="w-full lg:max-w-[48%] px-2 py-3 bg-white rounded-lg shadow-[1px_1px_2px_1px] shadow-gray-200">
      <div className="flex flex-col items-start w-full h-full gap-5">
        <div className="bg-[linear-gradient(180deg,#bde1b1_0%,#e3eee0_30%,#f0f5ef_60%,#ffffff_100%)] py-3 px-4 rounded-2xl shadow-[1px_1px_2px_1px] shadow-gray-300 w-full flex justify-start items-center">
          <div className="flex flex-col items-start justify-start w-[75%]  mr-auto">
            <span className="text-xs text-green-600 sm:text-sm">
              Delivering to
            </span>
            <span className="py-1 w-full text-xs sm:text-sm mask-[linear-gradient(90deg,#fff_80%,transparent)]">
              {delAddress?.address?.house?.split(';')?.join(' ') +
                ' ' +
                delAddress?.address?.locality}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 p-1 font-semibold text-green-600 border-2 border-green-700 rounded-lg sm:p-2 sm:text-lg">
            <RiEBike2Fill className="w-5 h-5 fill-green-500" />
            <span>30</span>
            <span>mins</span>
          </div>
        </div>
        <div className="hidden w-full px-6 py-5 overflow-y-auto bg-gray-100 md:block max-h-70 rounded-2xl">
          <ul className="w-full">
            {cart.map((item) => (
              <li
                key={item.itemId}
                className="flex items-center justify-start w-full py-3 not-last:border-b not-last:border-dashed not-last:border-gray-400"
              >
                <div className="flex items-center gap-3 mr-auto">
                  {item.foodType === 'veg' ? (
                    <BiCheckboxSquare className="w-5 h-5 fill-green-600" />
                  ) : (
                    <BiCaretUpSquare className="h-5 w-5 p-[2px] fill-red-600" />
                  )}
                  <span>{item.name}</span>
                  <span className="ml-5 cursor-pointer flex items-center gap-1 text-[.7rem] text-gray-500 hover:text-orange-500">
                    <span>addons</span>
                    <CiCircleInfo />
                  </span>
                </div>
                <div className="min-w-[24%] flex items-end gap-10">
                  <span className="text-[.8rem] text-gray-600">
                    x{item.quantity}
                  </span>
                  <span className="w-full font-sans font-semibold text-right">
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-start w-full px-2 py-3 sm:px-4 sm:py-5 rounded-2xl ">
          <span className="flex flex-col items-start justify-center gap-1 mr-auto font-semibold sm:block ">
            <span className="w-full sm:text-lg">Grand Total</span>
            <span className="text-[10px] w-full sm:text-[.7rem] text-gray-400 sm:ml-2">
              (*inclusive of all taxes)
            </span>
          </span>
          <span className="text-lg font-semibold tracking-wider text-green-600 sm:text-xl">
            {formatCurrency(
              totalCartPrice + DELIVERY_CHARGES_PER_KM * 5 + GST_CHARGES,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FinalOrderDraft;
