import { CgMenu } from 'react-icons/cg';
import { MdSpaceDashboard, MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaList } from 'react-icons/fa';
import { PiUserListFill } from 'react-icons/pi';
import { FaIndianRupeeSign, FaS } from 'react-icons/fa6';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';
import { RiTeamFill } from 'react-icons/ri';

import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

const DASHBOARD_LINKS = [
  {
    path: '/admin',
    name: 'Dashboard',
  },
  {
    path: '/admin/menu',
    name: 'Menu',
  },
  {
    path: '/admin/orders',
    name: 'Orders',
  },
  {
    path: '/admin/transactions',
    name: 'Transactions',
  },
  {
    path: '/admin/customers',
    name: 'Customers',
  },
  {
    path: '/admin/employees',
    name: 'Employees',
    path1: '/admin/employees/create',
  },
  {
    path: '/admin/settings',
    name: 'Settings',
  },
];

function Sidebar() {
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="hidden row-span-full lg:block bg-[rgb(254,251,215)] dark:bg-[#0a2f38]">
      <div
        className={`flex flex-col items-center ${collapse ? 'justify-between p-1' : 'justify-start p-1 xl:p-2'} w-full h-full  `}
      >
        {!collapse && (
          <>
            <div
              onClick={() => navigate('/')}
              className="flex items-center justify-center w-full"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND}public/img/logo/logo-horizontal.png`}
                alt="logo"
                className="-mt-6 xl:-mt-8 h-30 w-50 xl:h-35 xl:w-60"
              />
            </div>
            <div className="w-full px-2 py-5 xl:px-5 grow-1">
              <ul className="flex flex-col items-center justify-start w-full h-full gap-3 ">
                {DASHBOARD_LINKS.map((link) => (
                  <li
                    key={link.name}
                    role="button"
                    onClick={() => navigate(link.path)}
                    className={`cursor-pointer flex items-center justify-start w-full gap-3 p-2  ${location.pathname === link.path || location.pathname === link?.path1 ? 'bg-primary dark:bg-primary-dark rounded-lg text-white' : 'text-primary dark:text-primary-dark'}`}
                  >
                    <div
                      className={`p-1 xl:p-2 rounded-lg ${location.pathname === link.path || location.pathname === link?.path1 ? 'bg-white' : 'bg-primary dark:bg-primary-dark shadow-[1px_2px_5px_1px] shadow-amber-700 dark:shadow-gray-500'}`}
                    >
                      {link.name === 'Dashboard' ? (
                        <MdSpaceDashboard
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                      {link.name === 'Menu' ? (
                        <MdOutlineRestaurantMenu
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                      {link.name === 'Orders' ? (
                        <FaList
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                      {link.name === 'Transactions' ? (
                        <FaIndianRupeeSign
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                      {link.name === 'Customers' ? (
                        <PiUserListFill
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                      {link.name === 'Employees' ? (
                        <RiTeamFill
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                      {link.name === 'Settings' ? (
                        <IoMdSettings
                          className={`w-5 h-5 ${location.pathname === link.path || location.pathname === link?.path1 ? 'fill-primary dark:fill-primary-dark' : 'fill-white'}`}
                        />
                      ) : null}
                    </div>
                    <span className="font-semibold tracking-wide 2xl:text-lg">
                      {link.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {collapse && (
          <div className="flex items-center justify-center w-full">
            <span
              onClick={() => navigate('/')}
              className="text-3xl cursor-pointer"
            >
              🍔
            </span>
          </div>
        )}
        <div className="flex items-center justify-end w-full">
          <div
            className="p-1 rounded-lg hover:bg-[#fff9bf] hover:dark:bg-[#025163] transition-all duration-300 ease-linear"
            role="button"
            onClick={() => setCollapse((prev) => !prev)}
          >
            <TbLayoutSidebarLeftCollapseFilled className="w-8 h-7 text-primary dark:text-primary-dark" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

//bg-[#fffbda]
