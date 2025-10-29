import { CgTrack } from 'react-icons/cg';
import { GiCampCookingPot } from 'react-icons/gi';

import toast from 'react-hot-toast';

import Loader from '../../../components/Loader';
import { useAllOrders } from '../useAllOrders';
import VegLogoSelector from '../../../components/VegLogoSelector';
import { formatCurrency } from '../../../utils/helpers';
import { useNavigate } from 'react-router';

function ActiveOrdersList() {
  const { totalOrders, totalOrdersStatus } = useAllOrders();
  const navigate = useNavigate();

  if (totalOrdersStatus === 'pending') {
    return (
      <div className="w-full h-[80vh] bg-white">
        <div className="max-w-[1250px] w-full h-full mx-auto flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (totalOrdersStatus === 'error') {
    return (
      <div className="flex items-start justify-center w-full h-[80vh] pt-50">
        <p className="text-2xl font-bold bg-[linear-gradient(109deg,#fa7700_0%,#e07a20_40%,#ee9a4c_80%,#ff8015_100%)] bg-clip-text text-transparent flex flex-col justify-center items-center gap-2">
          <span>Nothing cooking at the moment.</span>
          <span>Place something delicious and we’ll track it right here!</span>
        </p>
      </div>
    );
  }

  const activeOrders = totalOrders.map((order) => {
    if (order.status !== 'delivered' || order.status !== 'cancelled')
      return order;
  });

  if (!activeOrders.length) {
    return (
      <div className="flex items-start justify-center w-full h-[80vh] pt-50">
        <p className="text-2xl font-bold bg-[linear-gradient(109deg,#fa7700_0%,#e07a20_40%,#ee9a4c_80%,#ff8015_100%)] bg-clip-text text-transparent flex flex-col justify-center items-center gap-2">
          <span>Nothing cooking at the moment.</span>
          <span>Place something delicious and we’ll track it right here!</span>
        </p>
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
    <div className="flex flex-col items-center justify-start w-full h-full gap-10 px-2 sm:px-10 pt-15">
      <h3 className="flex items-center justify-center gap-2 font-semibold tracking-wide sm:text-lg md:text-xl">
        <span className="uppercase font-poetsen bg-[linear-gradient(109deg,#fa7700_0%,#e07a20_40%,#ee9a4c_80%,#ff8015_100%)] bg-clip-text text-transparent flex justify-center items-center gap-1.5">
          Your order’s on a journey—pray for the fries
        </span>
        <GiCampCookingPot className="w-8 h-8 fill-orange-500" />
      </h3>

      <ul className="flex flex-col items-center justify-start w-full gap-5 px-2 py-10 overflow-y-auto sm:px-5 h-150">
        {activeOrders.map((order) => {
          return (
            <li
              key={order.customer_order_id}
              className="rounded-xl shadow-[1px_2px_5px_2px] shadow-gray-300 bg-gray-50 w-full lg:w-4/5 xl:w-3/5 py-1 px-3 max-h-100 grid grid-cols-[repeat(3,1fr)] grid-rows-[1fr_2fr_1fr] gap-2"
            >
              <div className="flex items-center justify-start gap-2 md:gap-5">
                <span className="text-xs sm:text-sm xl:text-[1rem]">
                  Order ID:
                </span>
                <span
                  onClick={() => copyText(order.customer_order_id)}
                  className="p-1 text-xs sm:text-sm xl:text-[1rem] font-semibold text-gray-500 bg-gray-300 cursor-pointer "
                >
                  #{order.customer_order_id}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 md:gap-5">
                {order.isPaid ? (
                  <>
                    <span className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-[1rem] uppercase font-semibold tracking-wide text-white bg-green-500 shadow-[1px_1px_2px] rounded-3xl text-shadow-2xs text-shadow-green-800 shadow-gray-300">
                      Paid
                    </span>
                    <span className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-[1rem] uppercase font-semibold tracking-wide text-white bg-yellow-500 shadow-[1px_1px_2px] rounded-3xl text-shadow-2xs text-shadow-yellow-800 shadow-gray-300">
                      {order.paymentSession.paymentMethod.slice(0, 3)}
                    </span>
                  </>
                ) : (
                  <span className="px-3 py-1 uppercase font-semibold tracking-wide text-white bg-yellow-500 shadow-[1px_1px_2px] rounded-3xl text-shadow-2xs text-shadow-yellow-800 shadow-gray-300">
                    cod
                  </span>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 md:gap-5">
                <span className="text-xs md:text-[1rem]">Status:</span>
                <span className="p-1 text-xs sm:text-sm md:text-[1rem] font-semibold tracking-wide text-green-500 uppercase border border-green-400 border-dotted">
                  {order.status}
                </span>
              </div>
              <ul className="flex flex-col items-start justify-start w-full col-span-2 col-start-1 col-end-4 gap-2 p-2 bg-gray-200">
                {order.orderItems.map((product) => (
                  <li
                    key={product.item._id}
                    className="flex flex-col items-start justify-center w-full gap-1 text-sm md:text-[1rem]"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-start gap-2">
                        <VegLogoSelector item={product.item} />
                        <span className="">{product.item.name}</span>
                      </div>
                      <div className="hidden sm:flex items-center justify-center gap-2 text-[.8rem]">
                        <span>{formatCurrency(product.item.price)}</span>
                        <span>x</span>
                        <span>{product.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-500">
                        {formatCurrency(product.item.price * product.quantity)}
                      </span>
                    </div>
                    <ul className="w-full pl-8 text-[.75rem] text-gray-500">
                      {product.addons.map((addon) => (
                        <li
                          key={addon._id}
                          className="flex flex-col items-start justify-center w-full gap-1"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-start gap-2">
                              <VegLogoSelector
                                item={addon}
                                height="4"
                                width="5"
                              />
                              <span className="">{addon.name}</span>
                            </div>
                            <span className="font-semibold text-gray-500">
                              {formatCurrency(addon.price * product.quantity)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-start col-start-1 col-end-3 gap-2 md:gap-5">
                <span className="font-semibold text-gray-600">Amount:</span>
                <span className="text-[1rem] md:text-xl font-bold tracking-wide text-green-500">
                  {formatCurrency(order.totalAmount)}
                </span>
                {order.tip ? (
                  <p className="flex items-end justify-start gap-1 text-xs md:text-sm md:gap-2">
                    <span>Tip:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(order.tip)}
                    </span>
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-center col-start-3">
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="flex items-center justify-center gap-1 bg-[radial-gradient(circle_farthest-corner_at_top_right,#d9590d_0%,#e5691e_30%,#ff7a29_60%,#eb5b00_90%)] py-1 px-3 md:py-3 md:px-6 text-white font-semibold tracking-wide text-shadow-xs text-shadow-orange-800 rounded-3xl shadow-[1px_1px_2px] shadow-gray-500 cursor-pointer hover:bg-[radial-gradient(circle_farthest-corner_at_top_right,#eb5b00_0%,#ff7a29_30%,#e5691e_60%,#d9590d_90%)] hover:shadow-[2px_3px_5px_1px] hover:shadow-orange-300 transition-all duration-300 delay-100 ease-linear"
                >
                  <CgTrack className="sm:w-5 sm:h-5" />
                  <span className="sm:text-[1rem] text-sm">Track Order</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActiveOrdersList;
