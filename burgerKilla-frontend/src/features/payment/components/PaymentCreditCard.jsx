import { IoAddCircleOutline } from 'react-icons/io5';

function PaymentCreditCard() {
  return (
    <div className="cursor-pointer w-full flex flex-col items-start gap-1 py-2 px-6 rounded-2xl shadow-[1px_1px_2px_1px] shadow-gray-200">
      <h3 className="font-semibold text-[1.1rem]">Credit Card</h3>
      <div className="w-full flex justify-start items-center">
        <div className="mr-auto flex justify-start items-center gap-2">
          <IoAddCircleOutline className="h-6 w-6" />
          <span className="text-wrap">Add new credit card</span>
        </div>
        <button className="cursor-pointer text-[1.1rem] border-b-3 border-b-orange-500 text-orange-600 font-semibold">
          ADD
        </button>
      </div>
    </div>
  );
}

export default PaymentCreditCard;
