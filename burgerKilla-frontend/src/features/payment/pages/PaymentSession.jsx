import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { MdTimerOff } from 'react-icons/md';
import { BiSolidErrorCircle } from 'react-icons/bi';

import { useSelector } from 'react-redux';

import { Link, useNavigate, useParams } from 'react-router';
import { selectUser } from '../../authentication/userSlice';

import SessionTimer from '../components/SessionTimer';
import PaymentOptions from '../components/PaymentOptions';
import Loader from '../../../components/Loader';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FinalOrderDraft from '../components/FinalOrderDraft';
import { RAZORPAY_CHECKOUT_ADDRESS } from '../../../utils/helpers';
import { usePaymentSession } from '../usePaymentSession';
import { useInvalidateSession } from '../useInvalidateSession';

function PaymentSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [delAddress, setDelAddress] = useState({});
  const { user, status } = useSelector(selectUser);
  const { sessionStatus, paymentSession } = usePaymentSession();
  const { invalidateSession, invalidateStatus } = useInvalidateSession();

  useEffect(
    function () {
      if (status === 'idle') {
        function loadScript(src) {
          const script = document.createElement('script');
          script.src = src;
          script.defer = true;
          document.body.appendChild(script);
        }
        loadScript(RAZORPAY_CHECKOUT_ADDRESS);

        function updateDeliveryAddress() {
          const orderDraft = JSON.parse(sessionStorage.getItem('orderDraft'));

          const findAddress = user.locations.find(
            (loc) => loc.addressId === orderDraft.address,
          );

          setDelAddress((prev) => {
            return { ...prev, ...findAddress };
          });
        }
        updateDeliveryAddress();
      }

      if (status !== 'error') return;

      toast('You are logged out! Log in back.', {
        position: 'top-center',
      });
      navigate('/');
    },
    [status],
  );

  if (status === 'pending' || sessionStatus === 'pending') {
    return (
      <div className="max-w-[600px] h-full mx-auto flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (sessionStatus === 'error' || invalidateStatus === 'error') {
    return (
      <div className="w-full h-screen bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
        <div className="max-w-[1250px] h-full mx-auto flex justify-center items-center">
          <div className="bg-white rounded-xl w-[50%] h-[50%] flex flex-col justify-center items-center gap-5">
            <div>
              <BiSolidErrorCircle className="w-20 h-20 fill-amber-500" />
            </div>
            <span className="flex flex-col items-center justify-center gap-2 font-semibold">
              <span>Something went wrong!</span>
              <span>Please go back and restart the session.</span>
            </span>
            <button
              onClick={() => navigate(-1, { replace: true })}
              className="px-8 py-3 text-lg font-bold tracking-wider text-white transition-colors duration-300 ease-linear cursor-pointer bg-amber-500 rounded-xl text-shadow-2xs text-shadow-amber-800 hover:bg-amber-500/85"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const remainingTime =
    Math.floor(new Date(paymentSession?.expiredAt) / 1000) -
    Math.floor(Date.now() / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="w-full h-auto lg:h-screen bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="max-w-[1250px] h-full mx-auto">
        <div className="flex flex-col items-start w-full h-full p-2 sm:py-4 sm:px-10 lg:pt-5">
          <div className="w-full bg-white shadow-[1px_1px_2px_1px] shadow-gray-200 flex justify-start items-center rounded-2xl p-1">
            <div className="flex justify-start w-full">
              <Link
                className="flex items-center justify-center cursor-pointer"
                to={'/checkout'}
                role="button"
              >
                <MdOutlineKeyboardArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 fill-orange-500" />
                <span className="tracking-wide text-orange-500">
                  Burger Killa
                </span>
              </Link>
            </div>
            <SessionTimer
              minutes={minutes}
              seconds={seconds}
              invalidateSession={invalidateSession}
              sessionId={sessionId}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-5 py-5 lg:justify-between lg:items-start lg:flex-row">
            <FinalOrderDraft
              locations={user.locations}
              delAddress={delAddress}
              setDelAddress={setDelAddress}
            />
            <PaymentOptions delAddress={delAddress} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSession;
