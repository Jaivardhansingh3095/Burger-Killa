import { useSelector } from "react-redux";
import { selectCart, selectTotalPrice } from "./cartSlice";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import EmptyCart from "./EmptyCart";
import { IoChevronBackOutline } from "react-icons/io5";

import { AnimatePresence, motion } from "motion/react";

function CartModalView({ handleModalClose }) {
  const cart = useSelector((state) => selectCart(state));
  const cartTotalPrice = useSelector((state) => selectTotalPrice(state));

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full h-full">
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            translateY: "-100px",
          }}
          animate={{
            opacity: 1,
            translateY: "0px",
          }}
          transition={{
            type: "spring",
            damping: "15",
            stiffness: "250",
            duration: 0.3,
            ease: "easeOut",
          }}
          exit={{
            translateY: "-50px",
            opacity: 0,
          }}
          className="relative flex flex-col items-center justify-between w-full h-full bg-gray-50 rounded-xl"
        >
          <div className="relative flex items-center justify-center w-full py-3 rounded-bl-lg rounded-br-lg bg-gray-300/60">
            <button
              onClick={handleModalClose}
              className="absolute flex items-center justify-center gap-2 text-sm font-semibold left-1"
            >
              <IoChevronBackOutline className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h2 className="text-xl font-bold tracking-wide text-center text-gray-700">
              Your Cart
            </h2>
          </div>
          <div className="flex flex-col items-center justify-start w-full h-full gap-2 p-2 overflow-y-auto">
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                {cart.map((item) => (
                  <CartItem key={item.itemId} item={item} />
                ))}
                {/* <div className="flex flex-col items-center justify-start w-full gap-2 overflow-y-auto max-h-120">
                
              </div> */}
              </>
            )}
          </div>
          {cart.length !== 0 ? (
            <CheckoutButton cartTotalPrice={cartTotalPrice} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CartModalView;
