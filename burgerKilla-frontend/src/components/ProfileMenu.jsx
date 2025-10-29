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
import { AnimatePresence, motion } from 'motion/react';

import { fetchUser } from '../features/authentication/userSlice';
import Modal from './Modal';
import { camelCaseName } from '../utils/helpers';
import { useEffect } from 'react';
import { useProfileWidth } from '../hook/useProfileWidth';

function ProfileMenu({ openModal, handleModalClose, currentUser }) {
  const { user, error } = currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileWidth } = useProfileWidth();

  useEffect(
    function () {
      if (error === '') return;
      navigate('/');
    },
    [error],
  );

  return createPortal(
    <Modal open={openModal} onModalClose={handleModalClose}>
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            width: '0%',
          }}
          animate={{
            opacity: 100,
            width: profileWidth,
          }}
          transition={{
            duration: '.3',
            ease: 'linear',
          }}
          exit={{
            opacity: 0,
          }}
          className="absolute top-0 right-0 h-full p-1 bg-orange-400 sm:p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute cursor-pointer top-3 -left-6 sm:-left-9"
            onClick={handleModalClose}
          >
            <ImCancelCircle className="w-5 h-5 sm:h-7 sm:w-7 fill-gray-50" />
          </div>
          <motion.div
            initial={{
              opacity: 0,
              translateY: '300px',
            }}
            animate={{
              translateY: '0',
              opacity: 100,
            }}
            transition={{
              delay: '.15',
              duration: '.5',
              ease: 'easeOut',
            }}
            className=" h-[80%] xl:h-[70%] w-full py-2 px-5 bg-gray-50 rounded-[5px] flex flex-col justify-start items-start"
          >
            <div className="flex items-start justify-start w-full gap-4 py-1 border-b-1 border-gray-300/80">
              <div className="">
                <MdAccountCircle className="w-16 h-16 fill-gray-300" />
              </div>
              <div className="flex flex-col items-start justify-center py-1">
                <span className="text-[1.1rem] text-gray-700 font-semibold tracking-wide">
                  {camelCaseName(user.name)}
                </span>
                <span className="text-gray-500">{user.email}</span>
              </div>
            </div>
            <ul className="flex flex-col items-center justify-start w-full py-1 text-gray-700">
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '1',
                //   ease: 'easeOut',
                // }}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
              >
                <Link to="/profile" onClick={handleModalClose}>
                  <span className="flex items-center justify-start gap-2">
                    <MdOutlineManageAccounts className="w-6 h-6 text-gray-400" />
                    <span>Personal Information</span>
                  </span>
                </Link>
              </motion.li>
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '1',
                //   ease: 'easeOut',
                // }}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
              >
                <Link to="/my-orders" onClick={handleModalClose}>
                  <span className="flex items-center justify-start gap-2">
                    <GoChecklist className="w-6 h-6 text-gray-400" />
                    <span className="">My Orders</span>
                  </span>
                </Link>
              </motion.li>
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '.3',
                //   ease: 'easeOut',
                // }}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
              >
                <Link to="update-contact" onClick={handleModalClose}>
                  <span className="flex items-center justify-start gap-2">
                    <MdOutlineSystemSecurityUpdate className="w-6 h-6 text-gray-400" />
                    <span className="">Update contact and password</span>
                  </span>
                </Link>
              </motion.li>
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '.3',
                //   ease: 'easeOut',
                // }}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
              >
                <Link to="manage-address" onClick={handleModalClose}>
                  <span className="flex items-center justify-start gap-2">
                    <FiMapPin className="w-6 h-6 text-gray-400" />
                    <span className="">Manage Address</span>
                  </span>
                </Link>
              </motion.li>
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '.3',
                //   ease: 'easeOut',
                // }}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
                onClick={handleModalClose}
              >
                <span className="flex items-center justify-start gap-2">
                  <CiCircleQuestion className="w-6 h-6 text-gray-400" />
                  <span className="">FAQs</span>
                </span>
              </motion.li>
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '.3',
                //   ease: 'easeOut',
                // }}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
              >
                <Link to="/refund-policy" onClick={handleModalClose}>
                  <span className="flex items-center justify-start gap-2">
                    <HiOutlineReceiptRefund className="w-6 h-6 text-gray-400" />
                    <span className="">How to track my refund</span>
                  </span>
                </Link>
              </motion.li>
              <motion.li
                // initial={{
                //   opacity: 0,
                //   width: '0%',
                // }}
                // animate={{
                //   width: '100%',
                //   opacity: 100,
                // }}
                // transition={{
                //   delay: '.2',
                //   duration: '.3',
                //   ease: 'easeOut',
                // }}
                onClick={handleModalClose}
                className="w-full py-3 transition duration-100 cursor-pointer not-last:border-b-1 border-gray-300/80 hover:text-orange-500"
              >
                <span className="flex items-center justify-start gap-2">
                  <PiWarningOctagonLight className="w-6 h-6 text-gray-400" />
                  <span className="">Raise a concern</span>
                </span>
              </motion.li>
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
              <span className="flex items-center justify-center gap-2 text-gray-700">
                <BiLogOut className="w-5 h-5 fill-gray-500" />
                <span className="font-semibold tracking-wide">Logout</span>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Modal>,
    document.body,
  );
}

export default ProfileMenu;
