import { useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';
import { selectCart, selectTotalPrice } from './cartSlice';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';

function Cart() {
  const cart = useSelector((state) => selectCart(state));
  const cartTotalPrice = useSelector((state) => selectTotalPrice(state));

  return (
    <div className="lg:block hidden bg-gray-50 flex-2/5 xl:flex-1/4 h-full rounded-[5px] overflow-hidden">
      <div>
        <h2 className="my-1 text-xl tracking-wide text-center text-gray-700">
          Your Cart
        </h2>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-2 p-2">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex flex-col items-center justify-start w-full gap-2 overflow-y-auto max-h-120">
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
