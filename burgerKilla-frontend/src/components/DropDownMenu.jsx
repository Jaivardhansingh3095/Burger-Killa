import { AnimatePresence, motion } from 'motion/react';
import Modal from './Modal';
import { ImCancelCircle } from 'react-icons/im';
import { Md10K, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'Menu', to: '/menu' },
  { name: 'About', to: '/about' },
  { name: 'My Order', to: '/order' },
];

function DropDownMenu({ openModal, handleModalClose }) {
  const navigate = useNavigate();
  return (
    <Modal open={openModal} onModalClose={handleModalClose}>
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            height: '0%',
          }}
          animate={{
            opacity: 100,
            height: '100%',
          }}
          transition={{
            duration: '.3',
            ease: 'linear',
          }}
          exit={{
            opacity: 0,
          }}
          className="absolute top-0 left-0 w-full h-full p-1 bg-orange-400 sm:p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute bottom-[10%] left-[50%] -translate-x-[50%] cursor-pointer"
            onClick={handleModalClose}
          >
            <ImCancelCircle className="w-12 h-12 fill-gray-50" />
          </div>
          <div className=" h-[80%] w-full py-5 px-5 sm:px-20 md:px-40">
            <ul className="flex flex-col items-start justify-start w-full h-full p-5 bg-white rounded-md sm:text-lg">
              {NAV_LINKS.map((navlink) => (
                <li
                  key={navlink.name}
                  role="button"
                  onClick={() => {
                    handleModalClose();
                    navigate(navlink.to);
                  }}
                  className="flex items-center justify-between w-full p-3 text-gray-500 transition-colors duration-300 ease-linear cursor-pointer not-last:border-b not-last:border-b-gray-300 hover:text-orange-500"
                >
                  <span>{navlink.name}</span>
                  <MdOutlineKeyboardArrowRight />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}

export default DropDownMenu;
