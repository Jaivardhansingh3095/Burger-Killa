import { NavLink } from 'react-router';

function ButtonLogin() {
  return (
    <NavLink
      type="button"
      role="button"
      to="/login"
      aria-roledescription="Button to login your account"
      className="px-3 md:px-6 py-1 md:py-2 md:text-[1.1rem] text-gray-50  shadow-[0px_1px_1px_1px] shadow-orange-200 rounded-xl border-2 border-transparent bg-orange-600 focus:outline-none hover:bg-orange-500 cursor-pointer transition-all duration-300 delay-75 tracking-widest hover:border-orange-700 hover:border-2 hover:shadow-none"
    >
      Login
    </NavLink>
  );
}

export default ButtonLogin;
