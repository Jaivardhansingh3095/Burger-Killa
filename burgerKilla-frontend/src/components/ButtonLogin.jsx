import { NavLink } from 'react-router';

function ButtonLogin() {
  return (
    <NavLink
      type="button"
      role="button"
      to="/login"
      aria-roledescription="Button to login your account"
      className="px-6 py-2 text-gray-50 rounded-xl border-2 border-orange-400 bg-orange-600 outline-none hover:bg-orange-500 cursor-pointer transition-all duration-300 delay-75 tracking-wider hover:border-orange-700 hover:border-2"
    >
      Login
    </NavLink>
  );
}

export default ButtonLogin;
