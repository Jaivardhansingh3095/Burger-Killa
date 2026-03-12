import { MdDeliveryDining, MdError } from "react-icons/md";
import { HiReceiptTax } from "react-icons/hi";
import { TbTipJar } from "react-icons/tb";
import { RiDiscountPercentFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { RiRestaurantFill } from "react-icons/ri";

import { useEffect, useRef, useState } from "react";
import { useOrders } from "./useOrders";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import useOutsideClick from "../../../../hook/useOutsideCllick";
import LoaderDasher from "../../../../components/LoaderDasher";
import Modal from "../../../../components/Modal";
import OrderDetails from "./OrderDetails";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";
import ErrorOrderModal from "./ErrorOrderModal";
import OrderUpdatePendingModal from "./OrderUpdatePendingModal";
import { useSearchParams } from "react-router";

const columnHelper = createColumnHelper();

function OrderManagement() {
  const [searchParams, setSearchParams] = useSearchParams({ status: "active" });
  const [allOrdersStatus, setAllOrdersStatus] = useState("");
  const [status, setStatus] = useState({});
  const OrderInfo = useRef(null);

  const { orders, ordersStatus, ordersRefetch } = useOrders();

  const { updateOrder, updatingOrder, updatedOrder, updateOrderError } =
    useUpdateOrderStatus();

  //Modals for full order information, error display and loading screen while updating the order status
  const { openModal: openOrderDetails, handleModalClose: handleOrderDetails } =
    useOutsideClick();
  const {
    openModal: orderErrorModal,
    handleModalClose: handleOrderErrorModal,
  } = useOutsideClick();
  const {
    openModal: updatePendingModal,
    handleModalClose: handleUpdatePendingModal,
  } = useOutsideClick();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("orderId", {
        header: "Order Id",
        cell: ({ row }) => {
          const orderId = row.original.orderId;

          return (
            <span className="text-sm font-semibold tracking-wide text-gray-600">
              {orderId}
            </span>
          );
        },
      }),
      columnHelper.accessor("items", {
        header: "Items",
        cell: ({ row }) => {
          const items = row.original.items || [];
          return (
            <ul className="flex flex-col items-start justify-start gap-2 pl-5">
              {items.map((item) => (
                <li
                  key={item.item._id}
                  className="flex items-start justify-start gap-5"
                >
                  <span className="font-semibold">{item.quantity}x</span>
                  <span className="flex flex-col items-start justify-start gap-1">
                    <span>{item.item.name}</span>
                    <span className="flex flex-col items-start justify-start gap-0.5 text-sm">
                      {item.addons.map((addon) => (
                        <span
                          key={addon._id}
                          className="flex items-center justify-start gap-2"
                        >
                          <span>--</span>
                          <span>{addon.name}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          );
        },
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ row }) => {
          const amount = row.original.amount;
          const gst = row.original.gst;
          const deliveryFee = row.original.deliveryFee;
          const tip = row.original.tip;
          const discount = row.original.discount;
          return (
            <ul className="flex flex-col items-start justify-start gap-2 pl-2 text-sm">
              <li className="flex items-center justify-start gap-2 tracking-wide">
                <RiMoneyRupeeCircleFill className="w-5 h-5 fill-green-600" />
                <span className="text-lg font-semibold text-green-600">
                  {amount}
                </span>
              </li>
              <li className="flex items-center gap-2 tracking-wide center">
                <RiRestaurantFill />
                <div className="font-semibold">
                  {amount - gst - deliveryFee - tip - discount}
                </div>
              </li>
              <li className="flex items-center gap-2 tracking-wide center">
                <MdDeliveryDining />
                <div className="font-semibold">{deliveryFee}</div>
              </li>
              <li className="flex items-center gap-2 tracking-wide center">
                <HiReceiptTax />
                <div className="font-semibold">{gst}</div>
              </li>
              {tip !== 0 ? (
                <li className="flex items-center gap-2 tracking-wide center">
                  <TbTipJar className="text-blue-600" />
                  <div className="font-semibold text-blue-600">{tip}</div>
                </li>
              ) : null}
              {discount !== 0 ? (
                <li className="flex items-center gap-2 tracking-wide center">
                  <RiDiscountPercentFill className="text-rose-600" />
                  <div className="font-semibold text-rose-600">{discount}</div>
                </li>
              ) : null}
            </ul>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
          //const status = row.original.status;
          const orderId = row.original.orderId;
          const tempStatus = row.original.status;
          return (
            <select
              value={status[orderId]}
              onChange={(e) => {
                if (tempStatus === e.target.value) return;
                updateOrder({ orderId, status: e.target.value });
                // setStatus((prev) => ({
                //   ...prev,
                //   [orderId]: e.target.value,
                // }));
                handleUpdatePendingModal();
              }}
              className="px-2 py-1 bg-white rounded-md outline-none shadow-[0px_1px_5px_1px] shadow-gray-300 font-semibold tracking-wide"
            >
              {tempStatus === "confirmed" && (
                <option value="confirmed">Confirmed</option>
              )}
              {(tempStatus === "preparing" || tempStatus === "confirmed") && (
                <option value="preparing">Preparing</option>
              )}
              {(tempStatus === "delivering" ||
                tempStatus === "preparing" ||
                tempStatus === "confirmed") && (
                <option value="delivering">Delivering</option>
              )}
              {tempStatus === "delivered" ? (
                <option value="delivered">Delivered</option>
              ) : tempStatus === "cancelled" ? (
                <option value="cancelled">Cancelled</option>
              ) : (
                <>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </>
              )}
            </select>
          );
        },
      }),
      columnHelper.accessor("paid", {
        header: "Paid",
        cell: ({ row }) => {
          const paid = row.original.paid;
          return (
            <div className="px-2">
              {paid ? (
                <div className="px-1 py-1 font-bold tracking-wide text-white bg-green-600 rounded-md shadow-[0px_1px_5px_1px] shadow-gray-700">
                  Paid
                </div>
              ) : (
                <div className="px-1 py-1 font-bold tracking-wide text-white bg-blue-600 rounded-md shadow-[0px_1px_5px_1px] shadow-gray-400">
                  COD
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.original.createdAt || "";
          const localTime = new Date(createdAt).toLocaleString().split(", ");

          return (
            <div className="flex flex-col items-center justify-start gap-2 text-sm font-semibold">
              <span>{localTime[0]}</span>
              <span>{localTime[1]}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("edt", {
        header: "EDT",
        cell: ({ row }) => {
          const edt = row.original.edt || "";
          const createdAt = row.original.createdAt || "";

          const localTime = new Date(edt).toLocaleString().split(", ");
          const deliveryTime =
            new Date(edt).getTime() - new Date(createdAt).getTime();

          return (
            <div className="flex flex-col items-center justify-start gap-2 text-sm font-semibold">
              <span>{localTime[0]}</span>
              <span>{localTime[1]}</span>
              <span className="flex items-center justify-center gap-2 text-lg text-rose-500">
                <span>{Math.floor(deliveryTime / 60000)}</span>
                <span>mins</span>
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("fullOrder", {
        header: "Full Order",
        cell: ({ row }) => {
          const orderId = row.original.orderId;
          return (
            <button
              onClick={() => {
                const order = orders?.find(
                  (order) => order.customer_order_id === orderId
                );

                OrderInfo.current = order;
                handleOrderDetails();
              }}
              className="px-4 py-2 font-semibold tracking-wide text-white rounded-md cursor-pointer bg-primary dark:bg-primary-dark text-shadow-2xs text-shadow-amber-900 dark:text-shadow-blue-900 shadow-[1px_2px_3px_1px] shadow-gray-400 hover:bg-primary/85 dark:hover:bg-primary-dark/85"
            >
              Info
            </button>
          );
        },
      }),
    ];
  }, [orders]);

  const filterOrders = useMemo(() => {
    if (ordersStatus === "pending" || ordersStatus === "error") return;
    return orders.map((order) => {
      return {
        orderId: order.customer_order_id,
        items: order.orderItems,
        amount: order.totalAmount,
        gst: order.gst,
        deliveryFee: order.deliveryFee,
        tip: order.tip,
        discount: order.discount,
        status: order.status,
        paid: order.isPaid,
        createdAt: order.createdAt,
        edt: order.estimatedDeliveryTime,
      };
    });
  }, [orders]);

  //creating table
  const table = useReactTable({
    data: filterOrders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(
    function () {
      if (updatingOrder === "success") {
        setStatus((prev) => ({
          ...prev,
          [updatedOrder.customer_order_id]: updatedOrder.status,
        }));
        ordersRefetch();
        return;
      }

      if (updatingOrder === "error") {
        handleOrderErrorModal();
        return;
      }

      if (ordersStatus === "success") {
        setStatus((prev) => {
          const newObj = {};
          for (let i = 0; i < orders.length; i++) {
            newObj[orders[i].customer_order_id] = orders[i].status;
          }
          return { ...prev, ...newObj };
        });
      }
    },
    [ordersStatus, updatingOrder]
  );

  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-col items-center justify-start w-full h-full gap-5">
        <div className="flex items-center justify-end w-full pr-5">
          <div className="flex items-center justify-center gap-5">
            <span className="text-lg font-semibold text-gray-500">Status:</span>
            <select
              value={allOrdersStatus}
              onChange={(e) => {
                setSearchParams((prev) => ({
                  ...prev,
                  status: e.target.value,
                }));
                setAllOrdersStatus(e.target.value);
              }}
              className={`w-30 p-1 bg-white outline-none shadow-[1px_2px_5px_2px] shadow-gray-300 dark:shadow-none rounded-md font-semibold ${allOrdersStatus === "active" ? "text-green-500" : allOrdersStatus === "delivered" ? "text-blue-500" : allOrdersStatus === "cancelled" ? "text-rose-500" : "text-green-500"}`}
            >
              <option value="active" className="font-semibold text-green-500">
                Active
              </option>
              <option value="delivered" className="font-semibold text-blue-500">
                Delivered
              </option>
              <option value="cancelled" className="font-semibold text-rose-500">
                Cancelled
              </option>
            </select>
          </div>
        </div>
        {ordersStatus === "pending" && (
          <div className="w-full h-full px-1 py-2">
            <div className="flex flex-col items-center justify-center w-full h-full gap-10 pt-10 pb-5 px-15">
              <LoaderDasher />
            </div>
          </div>
        )}
        {ordersStatus === "error" && (
          <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            <MdError className="w-10 h-10 fill-primary dark:fill-primary-dark" />
            <p className="text-xl ">
              Something went wrong. Please try refreshing the page.
            </p>
          </div>
        )}
        {ordersStatus === "success" && (
          <div className="flex flex-col items-center justify-start flex-1 w-full gap-3">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[900px] w-full h-full p-1 border-2 border-gray-300 ">
                <thead className="tracking-wider text-white">
                  {table.getHeaderGroups().map((hg) => (
                    <tr
                      key={hg.id}
                      className=" shadow-[0px_3px_4px_0px] shadow-amber-900"
                    >
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`z-11 py-3 text-shadow-2xs text-shadow-amber-900 bg-primary dark:bg-primary-dark ${
                            header.id === "name" ||
                            header.id === "salary" ||
                            header.id === "age"
                              ? "cursor-pointer hover:bg-amber-600/90 dark:hover:bg-primary-dark/70"
                              : ""
                          }`}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                      {/* <th className="bg-primary dark:bg-primary-dark"></th> */}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="not-last:border-b-2 not-last:border-b-gray-300"
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className={` ${index % 2 === 0 ? "" : "bg-gray-100"}`}
                        >
                          <div className="w-full h-full px-2 py-2 text-center text-gray-600">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center w-full gap-10">
              <button className="px-5 py-2 font-bold tracking-wider text-white rounded-md bg-primary dark:bg-primary-dark shadow-[0px_2px_5px_1px] shadow-amber-900 dark:shadow-none hover:bg-orange-500/85 dark:hover:bg-primary-dark/80 cursor-pointer transition-all duration-300 ease-linear text-shadow-2xs text-shadow-amber-900">
                prev
              </button>
              <div>Pages</div>
              <button className="px-5 py-2 font-bold tracking-wider text-white rounded-md bg-primary dark:bg-primary-dark shadow-[0px_2px_5px_1px] shadow-amber-900 dark:shadow-none hover:bg-orange-500/85 dark:hover:bg-primary-dark/80 cursor-pointer transition-all duration-300 ease-linear text-shadow-2xs text-shadow-amber-900">
                next
              </button>
            </div>
          </div>
        )}
      </div>
      {openOrderDetails && (
        <Modal open={openOrderDetails} onModalClose={handleOrderDetails}>
          <OrderDetails
            handleOrderDetails={handleOrderDetails}
            order={OrderInfo.current}
          />
        </Modal>
      )}
      {orderErrorModal && (
        <Modal open={orderErrorModal} onModalClose={handleOrderErrorModal}>
          <ErrorOrderModal
            handleOrderErrorModal={handleOrderErrorModal}
            updateOrderError={updateOrderError}
          />
        </Modal>
      )}
      {updatePendingModal && updatingOrder === "pending" && (
        <Modal
          open={updatePendingModal}
          onModalClose={handleUpdatePendingModal}
        >
          <OrderUpdatePendingModal />
        </Modal>
      )}
    </div>
  );
}

export default OrderManagement;

// if (ordersStatus === "pending") {
//   return (
//     <div className="w-full h-full px-1 py-2">
//       <div className="flex flex-col items-center justify-center w-full h-full gap-10 pt-10 pb-5 px-15">
//         <LoaderDasher />
//       </div>
//     </div>
//   );
// }

// if (ordersStatus === "error") {
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full gap-5">
//       <MdError className="w-10 h-10 fill-primary dark:fill-primary-dark" />
//       <p className="text-xl ">
//         Something went wrong. Please try refreshing the page.
//       </p>
//     </div>
//   );
// }

// return (
//   <>
//     <button
//       className="px-10 py-4 font-bold text-white bg-primary"
//       onClick={handleUpdatePendingModal}
//     >
//       Openn modal
//     </button>
//     {updatePendingModal && (
//       <Modal
//         open={updatePendingModal}
//         onModalClose={handleUpdatePendingModal}
//       >
//         <OrderUpdatePendingModal />
//       </Modal>
//     )}
//   </>
// );
