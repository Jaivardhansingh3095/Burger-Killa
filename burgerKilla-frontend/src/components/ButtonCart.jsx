import { PiShoppingCartSimple } from 'react-icons/pi';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector } from 'react-redux';
import {
  selectCart,
  selectCartQuantity,
  selectTotalPrice,
} from '../features/cart/cartSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../utils/helpers';

function ButtonCart() {
  const cart = useSelector(selectCart);
  const cartQuantity = useSelector(selectCartQuantity);
  const cartTotalAmount = useSelector(selectTotalPrice);
  const [openCart, setOpenCart] = useState(false);
  const buttonRef = useRef();
  const menuRef = useRef();
  const navigate = useNavigate();

  const handler = useCallback((e) => {
    if (!buttonRef.current && !menuRef.current) return;
    if (
      buttonRef.current &&
      menuRef.current &&
      !buttonRef.current.contains(e.target) &&
      !menuRef.current.contains(e.target)
    )
      setOpenCart(false);
  }, []);

  useEffect(
    function () {
      window.addEventListener('click', handler);

      return () => window.removeEventListener('click', handler);
    },
    [handler],
  );

  return (
    <div
      ref={buttonRef}
      role="button"
      className="relative items-end justify-center hidden gap-1 cursor-pointer lg:flex"
      onClick={() => setOpenCart((prev) => !prev)}
    >
      {cartQuantity ? (
        <span className="absolute top-[-1.25rem] left-1.5 text-shadow-2xs text-shadow-orange-900 font-mono font-extrabold  lg:text-[1.1rem] rounded-full z-10 text-gray-100 px-[8px] bg-orange-400 text-center">
          {cartQuantity}
        </span>
      ) : null}
      <PiShoppingCartSimple className="w-6 h-6 lg:h-7 lg:w-7" />
      <span className=" lg:text-lg">Cart</span>
      <AnimatePresence>
        {openCart && (
          <motion.div
            key="cartmodal"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 100,
            }}
            transition={{
              duration: '.3',
              ease: 'linear',
              delay: '.1',
            }}
            exit={{
              opacity: 0,
            }}
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute z-200 top-[3rem] left-[-9rem] p-3.5 rounded-2xl bg-orange-400 h-auto w-90 gap-3 flex flex-col justify-center items-center before:w-5 before:h-5 before:absolute before:bg-orange-400 before:top-[-.6rem] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:z-10"
          >
            {cartQuantity ? (
              <>
                <div className="flex flex-col items-start justify-center w-full gap-2 ">
                  <h3 className="w-full text-center text-gray-50">Your Cart</h3>
                  <ul className="flex flex-col items-start justify-center w-full gap-2 px-3 py-2 text-gray-600 bg-white rounded-xl">
                    {cart.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-col items-start justify-center w-full gap-1"
                      >
                        <span className="flex justify-start w-full">
                          <span className="text-[.9rem] mr-auto text-nowrap">
                            {item.name}
                          </span>
                          <span className="text-[.75rem]">
                            x {item.quantity}
                          </span>
                        </span>
                        <div className="w-full flex flex-col justify-center items-start gap-1 text-[.8rem] text-orange-300">
                          {item.addOns.map((addon) => (
                            <span className="w-full pl-5">
                              --- {addon.name}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="w-full px-2 flex justify-start items-center text-white text-[1.05rem]">
                    <span className="mr-auto">Subtotal</span>
                    <span>{formatCurrency(cartTotalAmount)}</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3">
                  <button
                    onClick={() => {
                      setOpenCart(false);
                      navigate('/checkout');
                    }}
                    className="bg-amber-50 text-gray-600 shadow-[1px_1px_5px_3px] shadow-amber-600 w-full py-2 rounded-xl border border-amber-400 tracking-wider  hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => {
                      setOpenCart(false);
                      navigate('/menu');
                    }}
                    className="bg-amber-50 text-gray-600 shadow-[1px_1px_5px_3px] shadow-amber-600 w-full py-2 rounded-xl border border-amber-400 tracking-wider hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in"
                  >
                    + Add Items
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center w-full gap-2 p-5 text-xl bg-amber-50 rounded-2xl text-nowrap">
                  <span className="text-4xl">🛒</span>
                  <span className="text-gray-600">Your cart is empty</span>
                </div>
                <button
                  onClick={() => {
                    setOpenCart(false);
                    navigate('/menu');
                  }}
                  className="bg-amber-50 text-gray-600 shadow-[1px_1px_5px_3px] shadow-amber-600 w-full py-3 rounded-xl border border-amber-400 tracking-wider hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in"
                >
                  + Add Items
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ButtonCart;
