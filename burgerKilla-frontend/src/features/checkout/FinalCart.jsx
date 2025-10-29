import { PiShoppingCartFill } from 'react-icons/pi';
import { LuPenLine } from 'react-icons/lu';
import { LiaAngleUpSolid } from 'react-icons/lia';
import { LiaAngleDownSolid } from 'react-icons/lia';

import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { Link } from 'react-router';
import VegLogoSelector from '../../components/VegLogoSelector';

function FinalCart({ cart }) {
  const [showAddon, setShowAddon] = useState(() => {
    const newObj = {};
    cart.forEach((item) => (newObj[`item-${item.itemId}`] = false));
    return newObj;
  });
  const [showInstruction, setShowInstruction] = useState(false);

  return (
    <div className="w-full h-auto p-1.5 sm:p-3 flex flex-col justify-center items-start bg-white rounded-2xl shadow-[1px_1px_2px_1px] shadow-gray-200">
      <div className="w-full py-1 border-b border-b-gray-200">
        <h3 className="flex items-center p-1 tracking-wider text-orange-500 sm:text-lg ">
          <span>
            Your <span className="font-semibold">CART</span>
          </span>
          <span>
            <PiShoppingCartFill className="h-5 sm:w-10 fill-orange-500 w-7 sm:h-7" />
          </span>
        </h3>
      </div>
      <div className="flex flex-col items-start justify-center w-full gap-2">
        <ul className="flex flex-col items-start justify-center w-full">
          {cart.map((item) => (
            <li
              key={item.itemId}
              className="flex flex-col items-start justify-center w-full py-2 border-b border-dashed sm:py-4 font-roboto border-b-gray-300"
            >
              <div className="flex items-center justify-start w-full">
                <div className="flex items-center justify-start gap-2 mr-auto">
                  <VegLogoSelector item={item} />
                  <p className="font-semibold tracking-wide text-gray-600 sm:text-lg">
                    {item.name}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <UpdateItemQuantity
                    quantity={item.quantity}
                    itemId={item.itemId}
                  />
                  <div className="sm:min-w-21">
                    <p className="w-full font-sans font-bold text-right">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
              {item?.addOns?.length ? (
                <div className="flex flex-col items-start justify-center w-full py-2 pl-7">
                  <button
                    onClick={() => {
                      setShowAddon((prev) => {
                        return {
                          ...prev,
                          [`item-${item.itemId}`]: !prev[`item-${item.itemId}`],
                        };
                      });
                    }}
                    className="flex items-center justify-center gap-1 text-gray-500 cursor-pointer"
                  >
                    <p className="text-xs tracking-wider sm:text-sm">Addons</p>
                    {showAddon[`item-${item.itemId}`] ? (
                      <LiaAngleDownSolid className="fill-gray-400" />
                    ) : (
                      <LiaAngleUpSolid className="fill-gray-400" />
                    )}
                  </button>
                  {showAddon[`item-${item.itemId}`] && (
                    <ul className="flex flex-col items-start justify-center w-full py-2">
                      {item.addOns.map((addon) => (
                        <li
                          key={addon._id}
                          className="flex items-center justify-start w-full py-1 text-xs sm:text-sm"
                        >
                          <div className="flex items-center justify-start gap-1 mr-auto">
                            <VegLogoSelector
                              item={addon}
                              height="4"
                              width="4"
                            />
                            <span>{addon.name}</span>
                            <span className="text-[10px] sm:text-xs">
                              ({addon.categories})
                            </span>
                          </div>
                          {
                            <span className="text-gray-600">
                              {formatCurrency(addon.price * item.quantity)}
                            </span>
                          }
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-start w-full gap-5">
          <button className="flex items-center justify-center gap-2 px-3 py-1 text-sm text-gray-400 transition-all duration-200 ease-in border border-gray-300 cursor-pointer rounded-2xl hover:text-gray-500 hover:bg-gray-100">
            <LuPenLine />
            <span>Special Instructions</span>
          </button>
          <Link
            role="button"
            to="/menu"
            className='text-gray-400 border border-gray-300 py-1 px-3 rounded-2xl text-[.9rem] cursor-pointer hover:text-gray-500 hover:bg-gray-100 transition-all duration-200 ease-in"'
          >
            + Add more items
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FinalCart;
