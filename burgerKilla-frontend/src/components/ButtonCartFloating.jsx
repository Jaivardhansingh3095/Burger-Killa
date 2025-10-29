import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { selectCartQuantity } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router';

function ButtonCartFloating() {
  const cartQuantity = useSelector(selectCartQuantity);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        scale: '1',
      }}
      animate={{
        scale: ['1.3', '1', '1.3', '1'],
      }}
      transition={{
        duration: '.8',
        ease: 'linear',
      }}
      onClick={() => navigate('/menu')}
      className="cursor-pointer lg:hidden fixed z-900 bottom-[10%] right-[9%] md:right-[5%] w-12 h-12 sm:w-15 sm:h-15 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors duration-300 ease-linear"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <PiShoppingCartSimpleFill className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
        <span className="absolute top-0 px-2 py-1 text-xs text-orange-500 bg-white border-2 border-gray-700 rounded-full -right-4">
          {cartQuantity}
        </span>
      </div>
    </motion.div>
  );
}

export default ButtonCartFloating;
