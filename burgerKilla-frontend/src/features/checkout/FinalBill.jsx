import { RiSecurePaymentFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import {
  DELIVERY_CHARGES_PER_KM,
  formatCurrency,
  GST_CHARGES,
} from '../../utils/helpers';
import { selectTotalPrice } from '../cart/cartSlice';

function FinalBill() {
  const totalCartPrice = useSelector((state) => selectTotalPrice(state));

  return (
    <div className="w-full p-3 flex flex-col justify-center items-start bg-white rounded-2xl shadow-[1px_1px_2px_1px] shadow-amber-200">
      <h3 className="w-full font-semibold text-orange-400 text-[1.1rem] pb-3 border-b border-b-gray-300">
        Bill Details
      </h3>
      <div className="w-full py-2 px-4 flex flex-col justify-center items-start gap-3">
        <div className="w-full flex flex-col justify-center items-start gap-2 text-[.9rem] tracking-wide">
          <div className="w-full flex justify-start items-center">
            <span className="mr-auto">Subtotal</span>
            <span>{formatCurrency(totalCartPrice)}</span>
          </div>
          <div className="w-full flex justify-start items-center">
            <span className="mr-auto">Delivery Charges</span>
            <span>{formatCurrency(DELIVERY_CHARGES_PER_KM * 5)}</span>
          </div>
          <div className="w-full flex justify-start items-center">
            <span className="mr-auto">GST</span>
            <span>{formatCurrency(GST_CHARGES)}</span>
          </div>
          <div className="w-full flex justify-start items-center">
            <span className="mr-auto font-semibold">Grand Total</span>
            <span className="font-semibold">
              {formatCurrency(
                totalCartPrice + DELIVERY_CHARGES_PER_KM * 5 + GST_CHARGES,
              )}
            </span>
          </div>
        </div>
        <button className="w-full text-white font-semibold rounded-2xl text-[1.05rem] border border-orange-600 bg-orange-400 py-3 px-6 flex justify-start items-center hover:bg-orange-500 transition duration-200 ease-in cursor-pointer">
          <span className="mr-auto flex justify-start items-center gap-1">
            <RiSecurePaymentFill />
            <span>Pay Securely</span>
          </span>
          <span>
            {formatCurrency(
              totalCartPrice + DELIVERY_CHARGES_PER_KM * 5 + GST_CHARGES,
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

export default FinalBill;
