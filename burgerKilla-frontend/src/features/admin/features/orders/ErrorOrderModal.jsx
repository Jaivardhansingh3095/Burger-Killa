import { BiSolidErrorCircle } from "react-icons/bi";

function ErrorOrderModal({ handleOrderErrorModal, updateOrderError }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] md:w-[600px] h-[60%] md:h-[300px] bg-white rounded-lg "
      >
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 px-5 py-1 ">
          <span>
            <BiSolidErrorCircle className="w-10 h-10 fill-rose-600" />
          </span>
          <span className="font-semibold text-gray-700 md:text-lg">
            Error with updating the status of order
          </span>
          <div className="flex flex-col items-center justify-center w-full gap-2 p-1 border border-gray-400 border-dashed">
            <span className="flex justify-start items-start gap-5 w-[80%]">
              <span className="font-semibold basis-1/3">Error message :</span>
              <span className="basis-2/3">{updateOrderError.message}.</span>
            </span>
            {/* <span className="flex justify-start items-center gap-5 w-[80%]">
              <span className="font-semibold basis-1/3">Status Code :</span>
              <span className="basis-2/3">Error with connection</span>
            </span>
            <span className="flex justify-start items-center gap-5 w-[80%]">
              <span className="font-semibold basis-1/3">Error status :</span>
              <span className="basis-2/3">Error with connection</span>
            </span> */}
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleOrderErrorModal}
              className="px-10 py-2 md:text-lg font-bold tracking-wider text-white rounded-lg shadow-[0px_2px_5px_1px] cursor-pointer shadow-gray-500 text-shadow-2xs text-shadow-yellow-900 bg-yellow-500 active:translate-y-0.5 active:shadow-[0px_1px_3px_1px] transition-all duration-200 ease-in-out"
            >
              Try Later!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorOrderModal;
