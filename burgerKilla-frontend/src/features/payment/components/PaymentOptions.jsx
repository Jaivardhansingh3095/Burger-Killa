import { IoShieldCheckmark } from 'react-icons/io5';
import { IoAddCircleOutline } from 'react-icons/io5';
import PaymentRazorpay from './PaymentRazorpay';
import PaymentUPI from './PaymentUPI';

function PaymentOptions({ delAddress, user }) {
  return (
    <div className="w-full lg:max-w-[48%] h-auto flex flex-col justify-start px-2 py-3 bg-white rounded-lg shadow-[1px_1px_2px_1px] shadow-gray-200">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center gap-2">
          <IoShieldCheckmark className="w-5 h-5 fill-green-600" />
          <h3 className="text-sm sm:text-[1.05rem] font-semibold">
            Secure Payment Options
          </h3>
        </div>
      </div>
      <div className="flex flex-col justify-start w-full gap-5 px-2 py-5">
        <PaymentUPI />
        <PaymentRazorpay delAddress={delAddress} user={user} />
      </div>
    </div>
  );
}

export default PaymentOptions;
