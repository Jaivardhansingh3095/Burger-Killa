import toast from 'react-hot-toast';
import { motion } from 'motion/react';

import LoaderSpinner from '../components/LoaderSpinner';
import { useOrder } from '../features/orderTracking/useOrder';
import { formatCurrency } from '../utils/helpers';
import { useNavigate } from 'react-router';

function ThankYou() {
  const { orderData, orderStatus } = useOrder();
  const navigate = useNavigate();

  if (orderStatus === 'pending') {
    return (
      <div className="w-full h-[80vh] bg-white">
        <div className="max-w-[1250px] w-full h-full mx-auto flex justify-center items-center">
          <LoaderSpinner content="Please wait a moment" />
        </div>
      </div>
    );
  }

  function copyText(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Text copied to clipboard'))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="w-full h-auto lg:h-[80vh] bg-white">
      <div className="max-w-[1250px] w-full h-hull mx-auto">
        <div className="flex flex-col items-start justify-start w-full h-full gap-2 px-2 py-10">
          <div className="flex items-center justify-center w-full pb-5 border-b border-dashed border-b-gray-500">
            <h2 className="relative w-full tracking-wider bg-[linear-gradient(128deg,#18ac25_0%,#3ab93c_60%,#83d985_100%)] text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent uppercase">
              <span className="3xl sm:5xl lg:6xl xl:text-7xl">T</span>hank you
              for the order
              <span className="absolute top-0 left-[5px] w-full bg-[linear-gradient(128deg,#2bca384a_0%,#4dc94f40_60%,#83d9855c_100%)] text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent uppercase">
                <span className="3xl sm:5xl lg:6xl xl:text-7xl">T</span>
                hank you for the order
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2 py-5 border-b border-dashed border-b-gray-500">
            <p className="font-semibold text-gray-600 sm:text-lg">
              Your order has been{' '}
              <span className="text-green-600">confirmed!</span>
            </p>
            <p className="flex items-center justify-start gap-5">
              <span className="sm:text-[1rem] text-sm">Order ID:</span>
              <span
                onClick={() => copyText(orderData.customer_order_id)}
                className="p-1 font-semibold text-gray-500 bg-gray-200 cursor-pointer sm:text-[1rem] text-sm"
              >
                #{orderData.customer_order_id}
              </span>
            </p>
            <p className="flex items-center justify-start gap-5">
              <span className="sm:text-[1rem] text-sm">Payment method:</span>
              <span className="p-1 font-semibold text-gray-500 sm:text-[1rem] text-sm">
                {orderData.paymentSession.paymentMethod}
              </span>
            </p>
            <p className="flex items-center justify-start gap-5 text-sm sm:text-[1rem]">
              <span>Delivery Address:</span>
              <span>{orderData.deliveryAddress.address.locality}</span>
            </p>
            <p className="flex items-end justify-start gap-5 py-1">
              <span className="font-semibold sm:text-lg">Total Amount:</span>
              <span className="text-lg font-bold text-green-600 sm:text-xl md:text-2xl">
                {formatCurrency(orderData.totalAmount)}
              </span>
              <span className="pb-1 text-xs text-gray-400 sm:text-sm">
                (*inclusive of all taxes)
              </span>
              {orderData.tip ? (
                <p className="flex items-end justify-start gap-5 pb-1 ml-5 sm:ml-10">
                  <span>Tip:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(orderData.tip)}
                  </span>
                </p>
              ) : null}
            </p>
          </div>
          <div className="flex flex-col items-center justify-start w-full gap-5 py-5">
            <p className="text-lg font-semibold text-gray-500">
              You can track your order here
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 1,
              }}
              transition={{
                duration: '.3',
                ease: 'easeInOut',
              }}
              onClick={() =>
                navigate(`/order`, {
                  replace: true,
                })
              }
              className="bg-[linear-gradient(120deg,#32a600_0%,#6cbf43_95%)] border border-green-600 px-6 sm:px-10 py-2 sm:py-3 md:py-4 font-semibold sm:text-lg md:text-xl text-gray-50 rounded-xl tracking-wide text-shadow-[1px_1px_2px] text-shadow-green-900 cursor-pointer shadow-[1px_1px_2px_1px] shadow-gray-400/90 inset-shadow-[1px_0px_3px,0px_-1px_1px] inset-shadow-gray-100 hover:bg-[linear-gradient(120deg,#6cbf43_5%,#32a600_100%)] transition-colors duration-300 ease-in-out "
            >
              Track Order
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
