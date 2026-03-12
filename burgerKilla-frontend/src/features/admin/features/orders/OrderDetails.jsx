import { FaLocationDot } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineWork } from 'react-icons/md';
import { MdOutlineLocationCity } from 'react-icons/md';

import { IoCloseCircle } from 'react-icons/io5';
import {
  BACKEND_IMAGE_ADDRESS,
  camelCaseName,
  formatCurrency,
  phoneNumberStandardization,
} from '../../../../utils/helpers';
import DisplayMap from '../../../map/DisplayMap';

function OrderDetails({ handleOrderDetails, order }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] p-2 h-[90%] md:min-w-[700px] md:min-h-[600px] lg:min-w-[950px] lg:min-h-[600px] xl:min-w-[1250px] xl:min-h-[650px] 2xl:min-w-[1500px] 2xl:min-h-[700px] bg-white rounded-xs"
      >
        <div
          className="absolute top-0 cursor-pointer -right-8"
          onClick={handleOrderDetails}
        >
          <IoCloseCircle className="w-7 h-7 fill-white" />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-10 overflow-y-auto lg:gap-1 lg:flex-row">
          <div className="flex flex-col-reverse items-center justify-start w-full h-auto gap-10 px-5 lg:gap-2 lg:flex-col lg:h-full lg:w-1/2 lg:px-0">
            <div className="w-full px-2 h-auto bg-gray-100 rounded-sm shadow-[0px_1px_4px_1px] shadow-gray-200">
              <ul className="flex flex-col items-start justify-start w-full gap-1 text-xs sm:text-sm md:text-[1rem]">
                <li className="flex items-center justify-start w-full">
                  <span className="font-semibold text-gray-500 basis-1/5">
                    Name :
                  </span>
                  <span className="font-semibold text-gray-700 basis-4/5">
                    {camelCaseName(order?.user?.name)}
                  </span>
                </li>
                <li className="flex items-center justify-start w-full">
                  <span className="font-semibold text-gray-500 basis-1/5">
                    Phone :
                  </span>
                  <span className="font-semibold text-gray-700 basis-4/5">
                    {phoneNumberStandardization(order?.user?.phoneNumber)}
                  </span>
                </li>
                <li className="flex items-center justify-start w-full">
                  <span className="font-semibold text-gray-500 basis-1/5">
                    Email :
                  </span>
                  <span className="font-semibold text-gray-700 basis-4/5">
                    {order?.user?.email}
                  </span>
                </li>
                <li className="flex items-start justify-start w-full">
                  <span className="font-semibold text-gray-500 basis-1/5">
                    Address :
                  </span>
                  <span className="flex flex-col items-start justify-start gap-1 font-semibold text-gray-700 basis-4/5">
                    <span className="flex flex-col items-start justify-start w-full gap-1 ">
                      <span>
                        {order?.deliveryAddress?.address?.house
                          .split(';')
                          .join(', ')}
                      </span>
                      <span>{order?.deliveryAddress?.address?.locality}</span>
                      <span className="px-2 text-gray-500 rounded-md bg-gray-50 shadow-2xs shadow-gray-300">
                        {order?.deliveryAddress?.address?.landmark}
                      </span>
                    </span>
                    <span className="flex items-center justify-between w-full">
                      <span className="flex items-center justify-start gap-2">
                        <span className="flex items-center justify-start gap-1">
                          <FaLocationDot />
                          <span>(lat,lng) :</span>
                        </span>
                        <span>
                          {order?.deliveryAddress?.coordinates[1]},{' '}
                          {order?.deliveryAddress?.coordinates[0]}
                        </span>
                      </span>
                      <span className="flex items-center justify-start gap-2">
                        <span>Type :</span>
                        <span className="flex items-center justify-center gap-1 px-2 py-1 bg-white rounded-md shadow-[1px_2px_5px_1px] shadow-gray-200">
                          {order?.deliveryAddress?.addressType === 'home' ? (
                            <IoMdHome className="fill-gray-400" />
                          ) : order?.deliveryAddress?.addressType === 'work' ? (
                            <MdOutlineWork className="fill-gray-400" />
                          ) : (
                            <MdOutlineLocationCity className="fill-gray-400" />
                          )}
                          <span className="text-gray-500">
                            {camelCaseName(order?.deliveryAddress?.addressType)}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-[70%] h-[1000px] lg:w-full lg:h-full">
              <DisplayMap
                geoLoc={{
                  lat: order?.deliveryAddress?.coordinates[1],
                  lng: order?.deliveryAddress?.coordinates[0],
                }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start w-full gap-10 lg:gap-2 lg:h-full lg:w-1/2">
            <div className="w-full h-auto px-5 py-1 lg:overflow-y-auto lg:h-3/5">
              <ul className="flex flex-col items-start justify-start w-full h-full gap-10">
                {order.orderItems.map((orderItem) => (
                  <li
                    key={orderItem.item._id}
                    className="flex flex-col items-start w-full gap-1"
                  >
                    <div className="flex items-start justify-between w-full gap-5">
                      <div>
                        <img
                          src={
                            BACKEND_IMAGE_ADDRESS +
                            orderItem.item.productImageSmall
                          }
                          alt={orderItem.item.name + ' image'}
                          className="w-20 h-20 rounded-md sm:w-30 sm:h-30 lg:w-20 lg:h-20 xl:w-30 xl:h-30 2xl:w-40 2xl:h-40"
                        />
                      </div>

                      <div className="flex flex-col items-start justify-start gap-5 grow-1">
                        <div className="flex items-center justify-between w-full gap-2 px-2">
                          <span className="font-semibold tracking-wide text-gray-700 text-xs md:text-sm lg:text-[1rem] 2xl:text-lg text-wrap">
                            {orderItem.item.name}
                          </span>
                          <span className="font-semibold text-gray-600 text-xs md:text-sm lg:text-[1rem]">
                            x{orderItem.quantity}
                          </span>
                          <span className="font-semibold text-green-600 text-xs md:text-sm lg:text-[1rem] 2xl:text-lg">
                            {formatCurrency(
                              orderItem.item.price * orderItem.quantity
                            )}
                          </span>
                        </div>
                        {orderItem.addons.length ? (
                          <div className="relative flex flex-col justify-start w-full gap-1 py-3 border-gray-400 border-dashed border-1 text-xs md:text-sm lg:text-[1rem]">
                            <div className="absolute px-2 text-[8px] sm:text-xs font-semibold bg-white lg:text-sm left-3 -top-3">
                              addons
                            </div>
                            {orderItem.addons.map((addon) => (
                              <div
                                key={addon._id}
                                className="flex items-center justify-between w-full px-2"
                              >
                                <span className="font-semibold tracking-wide text-gray-700 basis-3/5">
                                  {addon.name}
                                </span>
                                <div className="flex items-center justify-end basis-2/5">
                                  {/* <span className="font-semibold text-gray-600">
                                    x{orderItem.quantity}
                                  </span> */}
                                  <span className="font-semibold text-green-600">
                                    {formatCurrency(
                                      addon.price * orderItem.quantity
                                    )}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full h-auto px-5 py-2 lg:h-2/5">
              <ul className="w-full lg:h-full bg-white shadow-[1px_2px_4px_1px] shadow-gray-400 rounded-md flex flex-col justify-center items-center gap-2 text-xs md:text-sm lg:text-[1rem]">
                <li className="flex items-center w-[60%]">
                  <span className="font-semibold text-orange-500 basis-1/3">
                    Meal Price
                  </span>
                  <span className="text-center basis-1/3">--</span>
                  <span className="text-sm md:text-[1rem] lg:text-lg font-semibold text-orange-500 basis-1/3 text-end">
                    {formatCurrency(
                      order.totalAmount -
                        order.discount -
                        order.gst -
                        order.tip -
                        order.deliveryFee
                    )}
                  </span>
                </li>
                <li className="flex items-center w-[60%]">
                  <span className="font-semibold basis-1/3">Deivery Fee</span>
                  <span className="text-center basis-1/3">--</span>
                  <span className="font-semibold text-end basis-1/3">
                    {formatCurrency(order.deliveryFee)}
                  </span>
                </li>
                <li className="flex items-center w-[60%]">
                  <span className="font-semibold basis-1/3">GST</span>
                  <span className="text-center basis-1/3">--</span>
                  <span className="font-semibold basis-1/3 text-end">
                    {formatCurrency(order.gst)}
                  </span>
                </li>
                <li className="flex items-center  w-[60%]">
                  <span className="font-semibold basis-1/3">Discount</span>
                  <span className="text-center basis-1/3">--</span>
                  <span className="font-semibold basis-1/3 text-end">
                    {formatCurrency(order.discount)}
                  </span>
                </li>
                <li className="flex items-center w-[60%]">
                  <span className="font-semibold basis-1/3">Tip</span>
                  <span className="text-center basis-1/3">--</span>
                  <span className="font-semibold basis-1/3 text-end">
                    {formatCurrency(order.tip)}
                  </span>
                </li>
                <li className="flex items-center justify-between w-[60%]">
                  <span className="text-sm md:text-[1rem] lg:text-lg font-bold basis-1/3">
                    Total Amount
                  </span>
                  <span className="text-center basis-1/3">--</span>
                  <span className="text-sm md:text-[1rem] lg:text-lg font-bold text-green-600 basis-1/3 text-end">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
