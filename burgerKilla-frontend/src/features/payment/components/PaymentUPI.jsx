function PaymentUPI() {
  return (
    <div className="cursor-pointer w-full flex flex-col items-start gap-1 py-2 px-2 sm:px-6 rounded-lg shadow-[1px_1px_2px_1px] shadow-gray-200">
      <h3 className="text-sm font-semibold sm:text-lg">UPI</h3>
      <div className="flex items-center justify-between w-full gap-2 sm:gap-0">
        <div className="flex items-center justify-start gap-2">
          <img
            src="https://cashfreelogo.cashfree.com/assets_images/pg/upi/svg/bhim.svg"
            alt="upi logo"
            className="w-6 h-6 sm:h-9 sm:w-9 p-1 sm:p-2 rounded-full shadow-[1px_1px_1px_1px] shadow-gray-400"
            loading="lazy"
          />
          <span className="text-xs sm:text-[1rem] text-wrap">
            Pay using BHIM / PhonePe / Paytm / Google Pay
          </span>
        </div>
        <button className="font-semibold text-orange-600 cursor-pointer sm:ml-10 sm:text-lg border-b-3 border-b-orange-500">
          Proceed
        </button>
      </div>
    </div>
  );
}

export default PaymentUPI;
