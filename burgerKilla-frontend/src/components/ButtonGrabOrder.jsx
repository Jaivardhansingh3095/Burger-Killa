import { NavLink } from 'react-router';

function ButtonGrabOrder() {
  return (
    <NavLink
      to="/menu"
      role="button"
      className="px-6 py-5 font-bold text-xl tracking-wide rounded-xl cursor-pointer text-gray-50 text-shadow-2xs text-shadow-orange-800 bg-orange-400 border-orange-600 border-2 hover:text-orange-400 hover:bg-amber-100 transition duration-300 ease-in-out hover:scale-95 antialiased shadow-2xl/60 shadow-orange-400 hover:shadow-none hover:inset-shadow-[1px_1px_12px_0px] hover:inset-shadow-orange-600 active:scale-93"
    >
      Grab Your Order
    </NavLink>
  );
}

export default ButtonGrabOrder;
