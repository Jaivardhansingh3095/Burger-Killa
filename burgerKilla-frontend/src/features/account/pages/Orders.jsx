import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router";

function Orders() {
  return (
    <div className="flex items-center justify-center w-full h-screen py-3 bg-gray-50">
      <div className="w-[1250px] h-full bg-white rounded-lg shadow-[1px_1px_4px_2px,-1px_-1px_4px_2px] shadow-gray-100">
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 px-5 py-2">
          <div className="flex items-center justify-start w-full pt-2 pb-5 border-b border-dashed border-b-gray-300">
            <Link
              to={"/"}
              className="flex items-center justify-start gap-2 text-xl font-bold tracking-wide text-gray-700 transition-colors duration-200 ease-in cursor-pointer hover:text-primary"
            >
              <IoChevronBack className="w-6 h-6" />
              <span className="">Home</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start w-full gap-15 grow-1">
            <div className="flex flex-col items-start justify-center w-full gap-5 px-10 py-2">
              <h5 className="flex items-center justify-start gap-5">
                <span className="w-3.5 h-3.5 bg-[radial-gradient(circle_farthest-side_at_center_center,#1aff1a_0%,#23ce23_50%)] shadow-[1px_1px_3px_2px] shadow-green-700 rounded-full animate-flicker" />
                <span className="text-lg font-semibold tracking-wider text-gray-600">
                  Active Order
                </span>
              </h5>
              <div className="w-full rounded-lg shadow-[1px_1px_4px_4px,-1px_-1px_3px_1px] shadow-gray-100 p-2">
                Order details
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-5 px-10 py-2">
              <div className="flex items-center justify-between w-full">
                <h5 className="flex items-center justify-start gap-5">
                  <span className="text-lg font-semibold tracking-wider text-gray-600">
                    Previous Orders
                  </span>
                </h5>
                <div className="flex items-center justify-center gap-5">
                  <span className="font-semibold tracking-wider text-gray-600">
                    Filter:
                  </span>
                  <select className="h-8 px-5 py-1 text-gray-600 rounded-lg w-30 focus:outline-none shadow-[1px_1px_7px_1px] shadow-gray-300">
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>1 year</option>
                  </select>
                </div>
              </div>
              <ul className="flex flex-col w-full gap-5">
                <li className="w-full rounded-lg shadow-[1px_1px_4px_4px,-1px_-1px_3px_1px] shadow-gray-100 p-2">
                  Order details
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
