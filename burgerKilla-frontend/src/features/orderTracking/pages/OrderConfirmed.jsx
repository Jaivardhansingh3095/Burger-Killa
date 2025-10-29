import { Link } from 'react-router';
import Loader from '../../../components/Loader';
import OrderInformation from '../components/OrderInformation';
import OrderTracker from '../components/OrderTracker';
import { useOrder } from '../useOrder';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

function OrderConfirmed() {
  const { orderData, orderStatus } = useOrder();

  console.log({ orderData, orderStatus });

  if (orderStatus === 'pending') {
    return (
      <div className="w-full h-[80vh] bg-white">
        <div className="max-w-[1250px] w-full h-full mx-auto flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (orderStatus === 'error') {
    return (
      <div className="flex items-start justify-center w-full h-[80vh] pt-50">
        <p className="text-2xl font-bold bg-[linear-gradient(109deg,#fa7700_0%,#e07a20_40%,#ee9a4c_80%,#ff8015_100%)] bg-clip-text text-transparent flex flex-col justify-center items-center gap-2">
          <span>Nothing cooking at the moment.</span>
          <span>Place something delicious and we’ll track it right here!</span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      <div className="max-w-[1250px] w-full h-hull mx-auto">
        <div className="flex flex-col items-start justify-start w-full h-full p-2 gap-15">
          <div className="flex items-center justify-center gap-2">
            <Link
              className="flex items-center justify-center cursor-pointer"
              to="/order"
              role="button"
            >
              <MdOutlineKeyboardArrowLeft className="w-10 h-10 fill-orange-500" />
              <span className="tracking-wide text-[0.9rem] text-orange-500">
                Back to Order
              </span>
            </Link>
          </div>
          <OrderTracker orderData={orderData} />
          <OrderInformation orderData={orderData} />
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
