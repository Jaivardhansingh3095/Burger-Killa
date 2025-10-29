import { RiSecurePaymentFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import {
  DELIVERY_CHARGES_PER_KM,
  formatCurrency,
  GST_CHARGES,
} from '../../utils/helpers';
import { selectTotalPrice } from '../cart/cartSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useCreatePaymentSession } from './useCreatePaymentSession';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useEffect } from 'react';

function FinalBill({ address }) {
  const navigate = useNavigate();
  const totalCartPrice = useSelector((state) => selectTotalPrice(state));
  let { createSession, isCreating, isSuccess } = useCreatePaymentSession();
  const sessionIdRef = useRef('');

  useEffect(
    function () {
      if (!isSuccess) return;
      sessionStorage.setItem(
        'orderDraft',
        JSON.stringify({
          sessionId: sessionIdRef.current,
          address,
          amount: totalCartPrice + DELIVERY_CHARGES_PER_KM * 5 + GST_CHARGES,
        }),
      );
      navigate(`/pay/${sessionIdRef.current}`);
    },
    [isSuccess],
  );

  // if (isError) {
  //   return createPortal(
  //     <Modal open={openModal} onModalClose={handleModalClose}>
  //       <div
  //         onClick={(e) => e.stopPropagation()}
  //         className="flex flex-col items-center justify-center gap-2 p-4 bg-red-600 h-100 w-100"
  //       >
  //         <p>
  //           Some Error occured creating session. Try with refreshing the page
  //         </p>
  //         <button
  //           onClick={handleModalClose}
  //           className="px-4 py-2 text-white bg-red-500"
  //         >
  //           OK
  //         </button>
  //       </div>
  //     </Modal>,
  //     document.body,
  //   );
  // }

  return (
    <div className="w-full p-1 sm:p-3 flex flex-col justify-center items-start bg-white rounded-2xl shadow-[1px_1px_2px_1px] shadow-gray-200">
      <h3 className="w-full pb-3 font-semibold text-orange-400 border-b sm:text-lg border-b-gray-300">
        Bill Details
      </h3>
      <div className="flex flex-col items-start justify-center w-full gap-3 px-4 py-2">
        <div className="w-full flex flex-col justify-center items-start gap-2 text-[.9rem] tracking-wide">
          <div className="flex items-center justify-start w-full">
            <span className="mr-auto">Subtotal</span>
            <span>{formatCurrency(totalCartPrice)}</span>
          </div>
          <div className="flex items-center justify-start w-full">
            <span className="mr-auto">Delivery Charges</span>
            <span>{formatCurrency(DELIVERY_CHARGES_PER_KM * 5)}</span>
          </div>
          <div className="flex items-center justify-start w-full">
            <span className="mr-auto">GST</span>
            <span>{formatCurrency(GST_CHARGES)}</span>
          </div>
          <div className="flex items-center justify-start w-full">
            <span className="mr-auto font-semibold">Grand Total</span>
            <span className="font-semibold">
              {formatCurrency(
                totalCartPrice + DELIVERY_CHARGES_PER_KM * 5 + GST_CHARGES,
              )}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            const sessionId = nanoid();
            sessionIdRef.current = sessionId;
            createSession({
              sessionId,
              amount:
                totalCartPrice + DELIVERY_CHARGES_PER_KM * 5 + GST_CHARGES,
            });
          }}
          disabled={isCreating}
          className="w-full text-white font-semibold rounded-2xl text-[1.05rem] border border-orange-600 bg-orange-400 py-3 px-6 flex justify-between items-center hover:bg-orange-500 transition duration-200 ease-in cursor-pointer"
        >
          <span className="flex items-center justify-start gap-1">
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
