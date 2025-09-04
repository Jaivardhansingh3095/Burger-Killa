import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { MdAddShoppingCart } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { selectCartQuantity } from '../features/cart/cartSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

function ButtonCart() {
  //  const cart = useSelector(selectCart);
  const cartQuantity = useSelector(selectCartQuantity);
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
      className="relative cursor-pointer flex justify-center items-end gap-1"
      onClick={() => setOpenCart((prev) => !prev)}
    >
      {cartQuantity ? (
        <span className="absolute top-[-1.25rem] left-1.5 text-shadow-2xs text-shadow-orange-900 font-mono font-extrabold  text-[1.1rem] rounded-full z-10 text-gray-100 px-[8px] bg-orange-400 text-center">
          {cartQuantity}
        </span>
      ) : null}
      <PiShoppingCartSimple className="h-7 w-7" />
      <span className="text-[1.15rem]">Cart</span>

      {openCart && (
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute z-20 top-[3rem] left-[-4rem] p-3.5 rounded-2xl bg-orange-400 h-auto w-50 gap-3 flex flex-col justify-center items-center before:w-5 before:h-5 before:absolute before:bg-orange-400 before:top-[-.6rem] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:z-10"
        >
          {cartQuantity ? (
            <button
              onClick={() => {
                setOpenCart(false);
                navigate('/checkout');
              }}
              className="bg-amber-50 text-orange-500 shadow-[1px_1px_5px_3px] shadow-amber-600 w-full py-3 rounded-xl border border-amber-400 tracking-wider text-shadow-2xs text-shadow-orange-900 hover:bg-amber-200 cursor-pointer transition-all duration-200 ease-in"
            >
              Checkout
            </button>
          ) : (
            <div className="p-5 bg-amber-50 rounded-2xl text-nowrap flex flex-col items-center justify-center">
              <span>Your cart is empty</span>
              <span>🛒</span>
            </div>
          )}
          <button
            onClick={() => {
              setOpenCart(false);
              navigate('/menu');
            }}
            className="bg-amber-50 text-orange-500 shadow-[1px_1px_5px_3px] shadow-amber-600 w-full py-3 rounded-xl border border-amber-400 tracking-wider text-shadow-2xs text-shadow-orange-900 hover:bg-amber-200 cursor-pointer transition-all duration-200 ease-in"
          >
            + Add Items
          </button>
        </div>
      )}
    </div>
  );
}

export default ButtonCart;
