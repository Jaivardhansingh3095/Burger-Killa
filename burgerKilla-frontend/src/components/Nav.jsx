import { Link, NavLink, useLocation } from 'react-router';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiAccountCircle2Fill } from 'react-icons/ri';

import { useEffect } from 'react';

import ButtonCart from './ButtonCart';
import ButtonLogin from './ButtonLogin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../features/authentication/userSlice';
import useOutsideClick from '../hook/useOutsideCllick';
import DropDownMenu from './DropDownMenu';

// bg-[linear-gradient(86deg,rgba(255,151,15,1)_100%,rgba(252,206,159,1)_0%,rgba(255,228,196,1)_53%)]
// bg-[linear-gradient(86deg,#ffffe7f3_100%,#eeeed2ef_51%,#f8f8b5_0%)]
function Nav() {
  const { openModal, handleModalClose } = useOutsideClick();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => selectUser(state));

  //console.log(currentUser);
  useEffect(function () {
    dispatch(fetchUser());
  }, []);

  return (
    <nav
      className={`my-[-1remm] font-semibold  w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)] ${location.pathname !== '/' ? ' inset-shadow-[0px_-1px_5px] inset-shadow-amber-200' : ''}`}
    >
      <div className="max-w-[1250px] mx-auto text-gray-50 flex justify-evenly items-center gap-60 mb-[-2rem] mt-[-1rem]">
        <div className="flex-1/3 ">
          <Link to="/" className="focus:outline-none">
            <img
              src="./logo-black.png"
              alt="logo"
              className="h-35 w-100 ml-[-4rem] focus:outline-none"
            />
          </Link>
        </div>

        <div className="w-full flex justify-between items-center mt-[-.5rem] text-orange-500/90">
          <ul className="flex justify-center items-center min-w-36 text-[1.1rem]">
            <li className="mr-10  border-3 hover:border-b-orange-500/90 border-transparent transition duration-200 delay-100 ease-out">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="mr-10  border-3 hover:border-b-orange-500/90 border-transparent transition duration-200 delay-100 ease-out">
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li className="mr-10  border-3 hover:border-b-orange-500/90 border-transparent transition duration-200 delay-100 ease-out">
              <NavLink to="/about">About</NavLink>
            </li>
            {/* <li className="mr-10 border-3 hover:border-b-orange-500/90 border-transparent transition duration-200 delay-100 ease-out">
              <NavLink to="/reservation">Products</NavLink>
            </li> */}
            <li className="border-3 hover:border-b-orange-500/90 border-transparent transition duration-200 delay-100 ease-out">
              <NavLink to="/reservation">Reservations</NavLink>
            </li>
          </ul>

          <div className=" flex justify-between items-center gap-x-10">
            {/* <Searchbar /> */}
            <ButtonCart />
            {currentUser.status === 'idle' ? (
              <button className="cursor-pointer" onClick={handleModalClose}>
                <span className="flex justify-center items-center gap-1">
                  <RiAccountCircle2Fill className="h-7 w-7" />
                  <span className="tracking-wide text-[1.1rem]">Profile</span>
                </span>
              </button>
            ) : (
              <ButtonLogin />
            )}
            {openModal && (
              <DropDownMenu
                openModal={openModal}
                handleModalClose={handleModalClose}
                currentUser={currentUser}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
