import { PiShoppingCartFill } from 'react-icons/pi';

import { useSelector } from 'react-redux';
import FinalBill from '../features/checkout/FinalBill';
import FinalCart from '../features/checkout/FinalCart';
import Offer from '../features/checkout/Offer';
import SelectAddress from '../features/checkout/SelectAddress';
import { selectUser } from '../features/authentication/userSlice';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { selectCart } from '../features/cart/cartSlice';

//bg-[linear-gradient(86deg,#ffffe7f3_100%,#eeeed2ef_51%,#f8f8b5_0%)]
//bg-[linear-gradient(120deg,#fffff0f3_0%,#ffffdaf3_25%,#fefecef3_50%,#ffffdaf3_75%,#fffff0f3_100%)]

function Checkout() {
  const navigate = useNavigate();

  const { user, status } = useSelector((state) => selectUser(state));
  const cart = useSelector(selectCart);
  const [address, setAddress] = useState('');

  useEffect(
    function () {
      if (status === 'idle') {
        setAddress(() => {
          const checkDefault = user?.locations?.filter((loc) => loc?.isDefault);

          return (
            checkDefault?.at(0)?.addressId || user?.locations?.at(0)?.addressId
          );
        });
        return;
      }

      if (status !== 'error') return;

      toast('You are logged out! Log in back.', {
        position: 'top-center',
      });
      navigate('/');
    },
    [status],
  );

  if (status === 'pending') {
    return (
      <div className="max-w-[600px] h-full mx-auto flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="flex items-center justify-center w-full h-full font-semibold">
        <div className="flex flex-col items-center justify-center w-full h-auto gap-5 px-10">
          <PiShoppingCartFill className="h-30 w-30 fill-orange-400" />
          <p className="text-[1.3rem]">Your cart is Empty!</p>
          <Link
            to="/menu"
            className="py-4 px-8 rounded-2xl text-gray-50 tracking-wide border border-orange-600 shadow-[1px_1px_10px_2px] shadow-orange-200 bg-orange-400 text-shadow-2xs text-shadow-orange-800 cursor-pointer hover:bg-orange-500 transition-all dura ease-in"
          >
            Order Now
          </Link>
        </div>
      </div>
    );
  }

  function handleAddress(val) {
    setAddress(val);
  }

  return (
    <div className="w-full h-auto lg:h-screen bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="mx-auto max-w-[1250px] h-full flex flex-col lg:flex-row justify-start items-center px-2 sm:px-10 py-2 lg:px-4 xl:px-0 lg:py-5 overscroll-y-auto">
        <div className="w-full lg:w-[65%] h-full px-2 flex flex-col items-start gap-4">
          <SelectAddress
            user={user}
            address={address}
            handleAddress={handleAddress}
          />
          <FinalCart cart={cart} />
        </div>
        <div className="w-full lg:w-[35%] h-full px-2 sticky flex flex-col items-start gap-2">
          <Offer />
          <FinalBill address={address} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
