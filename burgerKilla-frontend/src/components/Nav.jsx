import { Link, NavLink, useLocation } from 'react-router';
import { RiVipCrownFill } from 'react-icons/ri';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/authentication/userSlice';

import ButtonCart from './ButtonCart';
import ButtonLogin from './ButtonLogin';
import ButtonProfile from './ButtonProfile';
import ButtonMenu from './ButtonMenu';
import ButtonDashboard from './ButtonDashboard';

// drop-shadow-[0px_2px_1px] drop-shadow-gray-400
// bg-[linear-gradient(86deg,rgba(255,151,15,1)_100%,rgba(252,206,159,1)_0%,rgba(255,228,196,1)_53%)]
// bg-[linear-gradient(86deg,#ffffe7f3_100%,#eeeed2ef_51%,#f8f8b5_0%)]
function Nav() {
  //const { openModal, handleModalClose } = useOutsideClick();
  const location = useLocation();

  const currentUser = useSelector((state) => selectUser(state));

  return (
    <nav
      className={`my-[-1remm] px-5 lg:px-0 font-semibold  w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)] ${location.pathname !== '/' ? ' inset-shadow-[0px_-1px_5px] inset-shadow-amber-200' : ''}`}
    >
      <div className="max-w-[1000px] xl:max-w-[1250px] mx-auto text-gray-50 flex justify-between items-center sm:10 lg:gap-60 mb-[-2rem] mt-[-1rem]">
        <div className="lg:flex-1/3">
          <Link to="/" className=" focus:outline-none">
            <img
              src={`${import.meta.env.VITE_BACKEND}public/img/logo/logo-black.png`}
              alt="logo"
              className="h-35 w-70 lg:w-70 xl:w-100 -ml-[2rem] xl:-ml-[4rem] focus:outline-none "
            />
          </Link>
        </div>

        <div className="w-full flex justify-end lg:justify-between items-center mt-[-.5rem] text-orange-500/90">
          <ul className="hidden lg:flex justify-center items-center min-w-36 text-[1.1rem]">
            <li className="relative not-last:mr-10 after:absolute after:top-full after:left-0 after:h-[2px] after:w-full after:bg-orange-400 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out">
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className={`relative not-last:mr-10 after:absolute after:top-full after:left-0 after:h-[2px] after:w-full after:bg-orange-400 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out`}
            >
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li
              className={`relative not-last:mr-10 after:absolute after:top-full after:left-0 after:h-[2px] after:w-full after:bg-orange-400 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out`}
            >
              <NavLink to="/about">About</NavLink>
            </li>
            {/* <li className="mr-10 transition duration-200 ease-out delay-100 border-transparent border-3 hover:border-b-orange-500/90">
              <NavLink to="/reservation">Products</NavLink>
            </li> */}
            {/* <li className="transition duration-200 ease-out delay-100 border-transparent border-3 hover:border-b-orange-500/90">
              <NavLink to="/reservation">Reservations</NavLink>
            </li> */}
            <li
              className={`relative not-last:mr-10 after:absolute after:top-full after:left-0 after:h-[2px] after:w-full after:bg-orange-400 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out`}
            >
              <NavLink to="/order" className="relative">
                My Order
                <span className="absolute top-[-1.1rem] left-[50%] translate-x-[-50%]">
                  <RiVipCrownFill className="w-5 h-5 fill-orange-500" />
                </span>
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center justify-between gap-x-10">
            <ButtonDashboard currentUser={currentUser} />
            <ButtonCart />
            {currentUser.status === 'idle' ? (
              <ButtonProfile currentUser={currentUser} />
            ) : (
              <ButtonLogin />
            )}
            <ButtonMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
