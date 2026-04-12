import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { selectUser } from "../../authentication/userSlice";
import Loader from "../../../components/Loader";
import ErrorDisplayNoAuthorization from "../../../components/ErrorDisplayNoAuthorization";
import { useActiveOrders } from "../useActiveOrders";
import { formatCurrency, formatDate } from "../../../utils/helpers";
import { useCompletedOrders } from "../useCompletedOrders";
import VegLogoSelector from "../../../components/VegLogoSelector";

function Orders() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => selectUser(state));
  const { activeOrders, activeOrderStatus } = useActiveOrders();
  const { completedOrders, completedOrdersStatus } = useCompletedOrders();

  if (
    currentUser.status === "pending" ||
    activeOrderStatus === "pending" ||
    completedOrdersStatus === "pending"
  ) {
    return (
      <div className="max-w-[600px] h-screen mx-auto flex justify-center items-center">
        <div className="w-full max-h-[600px] flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (currentUser.status === "error") {
    return (
      <div className="max-w-[600px] h-screen mx-auto flex justify-center items-center">
        <div className="w-full max-h-[600px]">
          <ErrorDisplayNoAuthorization message={currentUser?.error} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen py-3 bg-gray-50">
      <div className="md:min-w-[600px] w-full lg:min-w-[900px] xl:max-w-[1250px] grow-1 bg-white rounded-lg shadow-[1px_1px_4px_2px,-1px_-1px_4px_2px] shadow-gray-100">
        <div className="flex flex-col w-full h-full gap-5 px-1 py-2 sm:px-5">
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
            {activeOrders?.length ? (
              <div className="flex flex-col items-start justify-center w-full gap-5 px-2 py-2 md:px-5 lg:px-10">
                <h5 className="flex items-center justify-start gap-5">
                  <span className="w-3.5 h-3.5 bg-[radial-gradient(circle_farthest-side_at_center_center,#1aff1a_0%,#23ce23_50%)] shadow-[1px_1px_3px_2px] shadow-green-700 rounded-full animate-flicker" />
                  <span className="text-lg font-semibold tracking-wider text-gray-600">
                    Active Order
                  </span>
                </h5>
                <ul className="flex flex-col items-center justify-center w-full gap-10">
                  {activeOrders?.map((order) => (
                    <li
                      key={order.customer_order_id}
                      className="w-full rounded-lg shadow-[1px_1px_4px_4px,-1px_-1px_3px_1px] shadow-gray-100 py-2 px-2 sm:px-5 md:px-10"
                    >
                      <div className="sm:flex  sm:items-center sm:justify-between w-full sm:flex-row grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(2,1fr)] gap-2 sm:gap-0">
                        <div className="flex flex-col items-start justify-center gap-2">
                          <span className="font-bold sm:text-sm">Order Id</span>
                          <span className="px-1 py-1 text-xs tracking-wider text-gray-600 bg-gray-200 font-semibold sm:text-[1rem] sm:px-2 ">
                            {order.customer_order_id}
                          </span>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2">
                          <span className="font-bold ">Status</span>
                          <span className="px-2 py-1 font-semibold tracking-wider text-green-600 uppercase bg-green-200 ">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2">
                          <span className="font-bold">Amount</span>
                          <span className="p-1 text-lg font-bold tracking-wider text-green-600 text-shadow-2xs text-shadow-green-900">
                            {formatCurrency(order.totalAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-center col-span-3">
                          <button
                            onClick={() => navigate(`/order/${order._id}`)}
                            className="px-6 py-2 md:text-lg lg:text-xl font-bold tracking-wide text-white rounded-lg bg-primary shadow-[1px_1px_4px_1px,-1px_-1px_1px_2px] cursor-pointer shadow-gray-200 hover:bg-primary/90 transition-colors duration-200 ease-in"
                          >
                            Track Order
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {completedOrders?.length ? (
              <div className="flex flex-col items-start justify-center w-full gap-5 px-2 py-2 md:px-5 lg:px-10">
                <div className="flex items-center justify-between w-full">
                  <h5 className="flex items-center justify-start gap-5">
                    <span className="text-lg font-semibold tracking-wider text-gray-600">
                      Completed Orders
                    </span>
                  </h5>
                  <div className="flex items-center justify-center gap-5">
                    <span className="font-semibold tracking-wider text-gray-600">
                      Filter:
                    </span>
                    <select className="h-8 px-5 py-1 text-gray-600 rounded-lg w-30 focus:outline-none shadow-[1px_1px_7px_1px] shadow-gray-300">
                      <option>week</option>
                      <option>month</option>
                      <option>year</option>
                    </select>
                  </div>
                </div>
                <ul className="flex flex-col w-full gap-5">
                  {completedOrders.map((order) => (
                    <li
                      key={order.customer_order_id}
                      className="w-full rounded-lg shadow-[1px_1px_4px_4px,-1px_-1px_3px_1px] shadow-gray-100 py-2 sm:py-3 px-2 sm:px-5 flex flex-col lg:flex-row gap-5 lg:gap-2 xl:gap-5"
                    >
                      <div className="grid w-full grid-cols-2 grid-rows-2 gap-2 lg:h-full lg:w-auto lg:basis-1/2 sm:gap-4">
                        <div className="flex flex-col items-start justify-start gap-2">
                          <span className="font-extrabold">Order ID</span>
                          <span className="px-2 py-1 font-semibold text-gray-500 bg-gray-200">
                            {order.customer_order_id}
                          </span>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                          <span className="font-extrabold">Status</span>
                          <span className="px-2 py-1 font-semibold uppercase text-primary bg-amber-100">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                          <span className="font-extrabold">Amount</span>
                          <span className="text-lg font-bold text-green-600 text-shadow-2xs text-shadow-green-900 sm:text-xl">
                            {formatCurrency(order.totalAmount)}
                          </span>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                          <span className="font-extrabold">Created On</span>
                          <span className="font-bold text-gray-500">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full h-full gap-2 lg:w-auto lg:basis-1/2">
                        <span className="font-extrabold tracking-wider">
                          Order Items
                        </span>
                        <ul className="flex flex-col w-full gap-5 px-2 py-1 bg-primary/10 ">
                          {order.orderItems.map((orderItem) => (
                            <li
                              key={orderItem.item._id}
                              className="flex flex-col gap-1"
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="text-sm sm:text-[1rem] flex items-center justify-center gap-2">
                                  <VegLogoSelector item={orderItem.item} />
                                  <span className="font-semibold tracking-wider text-gray-700">
                                    {orderItem.item.name}
                                  </span>
                                </div>
                                <span className="font-bold text-gray-500">
                                  x {orderItem.quantity}
                                </span>
                              </div>
                              <ul className="flex flex-col w-full gap-1 pl-6">
                                {orderItem?.addons.map((addon) => (
                                  <li
                                    key={addon._id}
                                    className="flex items-center justify-start w-full gap-2 text-xs sm:text-sm"
                                  >
                                    <VegLogoSelector item={addon} />
                                    <span className="tracking-wider text-gray-700">
                                      {addon.name}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <span className="text-lg font-bold tracking-wide text-primary sm:text-xl">
                Error 404: Appetite not found.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
