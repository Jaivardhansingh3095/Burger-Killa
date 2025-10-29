import toast from 'react-hot-toast';
import { RiEBike2Fill } from 'react-icons/ri';
import { IoCheckmarkCircle } from 'react-icons/io5';

const ORDERSTATUS = ['confirmed', 'preparing', 'delivering', 'delivered'];

function OrderTracker({ orderData }) {
  function copyText(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Text copied to clipboard'))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="flex flex-col justify-center w-full gap-5 md:text-sm">
      <div className="flex flex-col items-start justify-center w-full gap-5 px-10 py-1 text-gray-600 md:mx-0 sm:px-0 sm:gap-0 sm:items-center sm:border sm:border-gray-400 sm:border-dashed sm:flex-row ">
        <div className="flex items-center justify-center text-sm lg:text-[1rem] h-full gap-2 border-dashed sm:border-r sm:border-gray-400 flex-1/3">
          <span>Order Id:</span>
          <span
            onClick={() => copyText(orderData.customer_order_id)}
            className="p-1 font-semibold text-gray-500 bg-gray-300 cursor-pointer "
          >
            #{orderData.customer_order_id}
          </span>
        </div>
        <div className="flex items-center justify-center text-sm lg:text-[1rem]  h-full gap-2 border-dashed sm:border-r sm:border-gray-400 flex-1/3">
          <span>Delivered in:</span>
          <div className="font-semibold text-sm lg:text-[1.1rem] bg-green-600 text-white flex justify-center items-center gap-2 py-1 px-2 border-2 border-green-700 rounded-xl">
            <RiEBike2Fill className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            <span>30</span>
            <span>mins</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-full gap-2 text-sm lg:text-[1rem] flex-1/3">
          <span>Status:</span>
          <span className="p-1 font-semibold tracking-wide text-green-500 uppercase border border-green-400 border-dotted">
            {orderData.status}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-10 px-2 py-10 sm:px-5 lg:px-10">
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">
            {orderData.status === 'confirmed' &&
              'Your order has been confirmed'}
            {orderData.status === 'preparing' && "our chef's on aderline"}
            {orderData.status === 'delivering' && "We're on the way"}
            {orderData.status === 'delivered' &&
              'Your order has been delivered'}
          </span>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="relative flex items-center justify-end">
            <div className="relative w-5 h-5 bg-white border-2 border-gray-400 rounded-full md:w-6 md:h-6 ">
              <IoCheckmarkCircle
                className={`absolute z-10 -left-1 -top-1 w-6 h-6 md:w-7 md:h-7 fill-blue-500 ${orderData.status === 'confirmed' || orderData.status === 'preparing' || orderData.status === 'delivering' || orderData.status === 'delivered' ? '' : 'hidden'}`}
              />
            </div>
            <span
              className={`absolute text-xs md:text-[1rem] left-[-1.5rem] top-7 ${orderData.status === 'confirmed' || orderData.status === 'preparing' || orderData.status === 'delivering' || orderData.status === 'delivered' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              Confirmed
            </span>
          </div>
          <div className="relative flex items-center justify-end">
            <div className="flex items-center justify-center">
              <div className="relative h-1 bg-gray-400 w-25 md:w-50 rounded-2xl">
                <div
                  className={`absolute z-9 rounded-2xl -top-0.5 left-0 h-2 bg-blue-500 w-25 md:w-50 ${orderData.status === 'preparing' || orderData.status === 'delivering' || orderData.status === 'delivered' ? '' : 'hidden'}`}
                ></div>
              </div>
              <div className="relative w-5 h-5 bg-white border-2 border-gray-400 rounded-full md:w-6 md:h-6 ">
                <IoCheckmarkCircle
                  className={`absolute z-10 -left-1 -top-1 w-6 h-6 md:w-7 md:h-7 fill-blue-500 ${orderData.status === 'preparing' || orderData.status === 'delivering' || orderData.status === 'delivered' ? '' : 'hidden'}`}
                />
              </div>
            </div>
            <span
              className={`absolute text-xs md:text-[1rem] left-[5.3rem] md:left-[11rem] top-7 ${orderData.status === 'preparing' || orderData.status === 'delivering' || orderData.status === 'delivered' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              Preparing
            </span>
          </div>
          <div className="relative flex items-center justify-end">
            <div className="flex items-center justify-center">
              <div className="relative h-1 bg-gray-400 w-25 md:w-50 rounded-2xl">
                <div
                  className={`absolute z-9 rounded-2xl -top-0.5 left-0 h-2 bg-blue-500 w-25 md:w-50 ${orderData.status === 'delivering' || orderData.status === 'delivered' ? '' : 'hidden'}`}
                ></div>
              </div>
              <div className="relative w-5 h-5 bg-white border-2 border-gray-400 rounded-full md:w-6 md:h-6 ">
                <IoCheckmarkCircle
                  className={`absolute z-10 -left-1 -top-1 w-6 h-6 md:w-7 md:h-7 fill-blue-500 ${orderData.status === 'delivering' || orderData.status === 'delivered' ? '' : 'hidden'}`}
                />
              </div>
            </div>
            <span
              className={`absolute text-xs md:text-[1rem] left-[5.3rem] md:left-[11rem] top-7 w-20 ${orderData.status === 'delivering' || orderData.status === 'delivered' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              On the way
            </span>
          </div>
          <div className="relative flex items-center justify-end">
            <div className="flex items-center justify-center">
              <div className="relative h-1 bg-gray-400 w-25 md:w-50 rounded-2xl">
                <div
                  className={`absolute z-9 rounded-2xl -top-0.5 left-0 h-2 bg-blue-500 w-25 md:w-50 ${orderData.status === 'delivered' ? '' : 'hidden'}`}
                ></div>
              </div>
              <div className="relative w-5 h-5 bg-white border-2 border-gray-400 rounded-full md:w-6 md:h-6 ">
                <IoCheckmarkCircle
                  className={`absolute z-10 -left-1 -top-1 h-6 w-6 md:w-7 md:h-7 fill-blue-500 ${orderData.status === 'delivered' ? '' : 'hidden'}`}
                />
              </div>
            </div>
            <span
              className={`absolute text-xs md:text-[1rem] left-[5.3rem] md:left-[11rem] top-7 ${orderData.status === 'delivered' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracker;
