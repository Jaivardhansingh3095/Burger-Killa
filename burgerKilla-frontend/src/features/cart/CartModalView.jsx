import { useSelector } from 'react-redux';
import { selectCart, selectTotalPrice } from './cartSlice';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';
import EmptyCart from './EmptyCart';
import { ImCancelCircle } from 'react-icons/im';

function CartModalView({ handleModalClose }) {
  const cart = useSelector((state) => selectCart(state));
  const cartTotalPrice = useSelector((state) => selectTotalPrice(state));

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] h-[90%] w-[95%]  sm:h-[80%] sm:w-[80%] mx-auto"
    >
      <div className="relative flex flex-col items-center justify-between w-full h-full bg-gray-50 rounded-xl">
        <div>
          <h2 className="my-1 text-xl tracking-wide text-center text-gray-700">
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

        <div
          role="button"
          onClick={handleModalClose}
          className="absolute left-[50%] -translate-x-[50%] flex items-center justify-center -top-9 sm:-top-12"
        >
          <ImCancelCircle className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
        </div>
      </div>
    </div>
  );
}

export default CartModalView;
