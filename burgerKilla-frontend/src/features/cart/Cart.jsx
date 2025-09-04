import { useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';
import { selectCart, selectTotalPrice } from './cartSlice';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';

function Cart() {
  const cart = useSelector((state) => selectCart(state));
  const cartTotalPrice = useSelector((state) => selectTotalPrice(state));

  return (
    <div className="bg-gray-50 flex-1/4 h-full rounded-[5px] overflow-hidden">
      <div>
        <h2 className="text-center my-1 text-xl tracking-wide text-gray-700">
          Your Cart
        </h2>
      </div>
      <div className="p-2 w-full flex flex-col justify-start items-center gap-2">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="w-full max-h-120 overflow-y-auto flex flex-col justify-start items-center gap-2">
              {cart.map((item) => (
                <CartItem key={item.itemId} item={item} />
              ))}
            </div>
            <CheckoutButton cartTotalPrice={cartTotalPrice} />
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
