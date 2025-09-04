import { ImCancelCircle } from 'react-icons/im';
import { MdAccountCircle } from 'react-icons/md';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { GoChecklist } from 'react-icons/go';
import { HiOutlineReceiptRefund } from 'react-icons/hi2';
import { CiCircleQuestion } from 'react-icons/ci';
import { PiWarningOctagonLight } from 'react-icons/pi';
import { MdOutlineSystemSecurityUpdate } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../features/authentication/userSlice';

import Modal from './Modal';
import { camelCaseName } from '../utils/helpers';
import { useEffect } from 'react';

function DropDownMenu({ openModal, handleModalClose, currentUser }) {
  const { user, error } = currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (error === '') return;
      navigate('/');
    },
    [error],
  );

  return createPortal(
    <Modal open={openModal} onModalClose={handleModalClose}>
      <div
        className="h-full absolute right-0 top-0 w-100 bg-orange-400 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-3 -left-9 cursor-pointer"
          onClick={handleModalClose}
        >
          <ImCancelCircle className="h-7 w-7 fill-gray-50" />
        </div>
        <div className="h-[70%] w-full py-2 px-5 bg-gray-50 rounded-[5px] flex flex-col justify-start items-start">
          <div className="w-full py-1 flex justify-start items-start gap-4 border-b-1 border-gray-300/80">
            <div className="">
              <MdAccountCircle className="h-16 w-16 fill-gray-300" />
            </div>
            <div className="flex flex-col justify-center items-start py-1">
              <span className="text-[1.1rem] text-gray-700 font-semibold tracking-wide">
                {camelCaseName(user.name)}
              </span>
              <span className="text-gray-500">{user.email}</span>
            </div>
          </div>
          <ul className="w-full py-1 flex flex-col justify-start items-center text-gray-700">
            <li className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100">
              <Link to="/profile" onClick={handleModalClose}>
                <span className="flex justify-start items-center gap-2">
                  <MdOutlineManageAccounts className="h-6 w-6 text-gray-400" />
                  <span>Personal Information</span>
                </span>
              </Link>
            </li>
            <li className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100">
              <Link to="/my-orders" onClick={handleModalClose}>
                <span className="flex justify-start items-center gap-2">
                  <GoChecklist className="h-6 w-6 text-gray-400" />
                  <span className="">My Orders</span>
                </span>
              </Link>
            </li>
            <li className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100">
              <Link to="update-contact" onClick={handleModalClose}>
                <span className="flex justify-start items-center gap-2">
                  <MdOutlineSystemSecurityUpdate className="h-6 w-6 text-gray-400" />
                  <span className=" ">Update contact and password</span>
                </span>
              </Link>
            </li>
            <li className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100">
              <Link to="manage-address" onClick={handleModalClose}>
                <span className="flex justify-start items-center gap-2">
                  <FiMapPin className="h-6 w-6 text-gray-400" />
                  <span className=" ">Manage Address</span>
                </span>
              </Link>
            </li>
            <li
              className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100"
              onClick={handleModalClose}
            >
              <span className="flex justify-start items-center gap-2">
                <CiCircleQuestion className="h-6 w-6 text-gray-400" />
                <span className=" ">FAQs</span>
              </span>
            </li>
            <li className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100">
              <Link to="/refund-policy" onClick={handleModalClose}>
                <span className="flex justify-start items-center gap-2">
                  <HiOutlineReceiptRefund className="h-6 w-6 text-gray-400" />
                  <span className=" ">How to track my refund</span>
                </span>
              </Link>
            </li>
            <li
              onClick={handleModalClose}
              className="w-full py-3 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500 transition duration-100"
            >
              <span className="flex justify-start items-center gap-2">
                <PiWarningOctagonLight className="h-6 w-6 text-gray-400" />
                <span className=" ">Raise a concern</span>
              </span>
            </li>
          </ul>
          <button
            onClick={() => {
              localStorage.removeItem('jwt_token');
              dispatch(fetchUser());
              navigate('/');
              handleModalClose();
            }}
            className="w-full mt-3 border-1 border-gray-300 py-3 bg-gray-100 rounded-[5px] cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-linear"
          >
            <span className="flex justify-center items-center gap-2 text-gray-700">
              <BiLogOut className="w-5 h-5 fill-gray-500" />
              <span className="tracking-wide font-semibold">Logout</span>
            </span>
          </button>
        </div>
      </div>
    </Modal>,
    document.body,
  );
}

export default DropDownMenu;
