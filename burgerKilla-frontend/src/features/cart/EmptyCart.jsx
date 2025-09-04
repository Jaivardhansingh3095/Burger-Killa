import { PiShoppingCartFill } from 'react-icons/pi';

function EmptyCart() {
  return (
    <div className="mt-10 flex flex-col justify-start items-center gap-3">
      <PiShoppingCartFill className="h-30 w-30 fill-gray-400/65" />
      <h3 className="text-[1.3rem] tracking-wide text-gray-800">
        Your cart is empty! 😟
      </h3>
      <p className="text-center ">
        Don't be <span className="text-orange-400 text-[1.15rem]">hungry</span>
        .
        <br />
        Take a bite—taste the joy!
      </p>
    </div>
  );
}

export default EmptyCart;
