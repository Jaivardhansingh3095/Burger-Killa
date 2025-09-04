import { PiShoppingCartFill } from 'react-icons/pi';
import { BiCheckboxSquare } from 'react-icons/bi';
import { BiCaretUpSquare } from 'react-icons/bi';
import { LuPenLine } from 'react-icons/lu';
import { LuClipboardList } from 'react-icons/lu';
import { LiaAngleUpSolid } from 'react-icons/lia';
import { LiaAngleDownSolid } from 'react-icons/lia';

import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { Link } from 'react-router';

function FinalCart({ cart }) {
  const [showAddon, setShowAddon] = useState(() => {
    const newObj = {};
    cart.forEach((item) => (newObj[`item-${item.itemId}`] = false));
    return newObj;
  });
  const [showInstruction, setShowInstruction] = useState(false);

  console.log(cart);

  return (
    <div className="w-full h-auto p-3 flex flex-col justify-center items-start bg-white rounded-2xl shadow-[1px_1px_2px_1px] shadow-amber-200">
      <div className="w-full py-1 border-b border-b-gray-200">
        <h3 className="text-orange-500 text-[1.1rem] p-1 tracking-wider flex items-center ">
          <span>
            Your <span className="font-semibold">CART</span>
          </span>
          <span>
            <PiShoppingCartFill className="fill-orange-500 h-7 w-10" />
          </span>
        </h3>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-2">
        <ul className="w-full flex flex-col items-start justify-center">
          {cart.map((item) => (
            <li
              key={item.itemId}
              className="py-4 w-full font-roboto flex flex-col justify-center items-start border-b border-dashed border-b-gray-300"
            >
              <div className="w-full flex justify-start items-center">
                <div className="mr-auto flex justify-start items-center gap-2">
                  {item.foodType === 'veg' ? (
                    <BiCheckboxSquare className="h-5 w-5 fill-green-600" />
                  ) : (
                    <BiCaretUpSquare className="h-5 w-5 p-[2px] fill-red-600" />
                  )}
                  <p className="text-gray-600 tracking-wide text-[1.1rem] font-semibold">
                    {item.name}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <UpdateItemQuantity
                    quantity={item.quantity}
                    itemId={item.itemId}
                  />
                  <div className="min-w-21">
                    <p className="w-full text-right font-sans font-bold">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
              {item?.addOns?.length ? (
                <div className="w-full flex flex-col justify-center items-start pl-7 py-2">
                  <button
                    onClick={() => {
                      setShowAddon((prev) => {
                        return {
                          ...prev,
                          [`item-${item.itemId}`]: !prev[`item-${item.itemId}`],
                        };
                      });
                    }}
                    className="cursor-pointer flex justify-center items-center gap-1 text-gray-500"
                  >
                    <p className="text-[.85rem] tracking-wider">Addons</p>
                    {showAddon[`item-${item.itemId}`] ? (
                      <LiaAngleDownSolid className="fill-gray-400" />
                    ) : (
                      <LiaAngleUpSolid className="fill-gray-400" />
                    )}
                  </button>
                  {showAddon[`item-${item.itemId}`] && (
                    <ul className="w-full py-2 flex flex-col items-start justify-center">
                      {item.addOns.map((addon) => (
                        <li
                          key={addon._id}
                          className="w-full py-1 text-[.85rem] flex justify-start items-center"
                        >
                          <div className="mr-auto  flex justify-start items-center gap-1">
                            {addon.foodType === 'veg' ? (
                              <BiCheckboxSquare className="h-4 w-4 fill-green-600" />
                            ) : (
                              <BiCaretUpSquare className="h-4 w-4 p-[2px] fill-red-600" />
                            )}
                            <span>{addon.name}</span>
                            <span className="text-[.8rem]">
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
        <div className="w-full flex justify-start items-center gap-5">
          <button className="flex justify-center items-center gap-2 text-gray-400 border border-gray-300 py-1 px-3 rounded-2xl text-[.9rem] cursor-pointer hover:text-gray-500 hover:bg-gray-100 transition-all duration-200 ease-in">
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
