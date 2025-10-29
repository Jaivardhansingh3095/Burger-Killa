import { NavLink, useNavigate } from 'react-router';
import { motion } from 'motion/react';

//inset-shadow-[0px_-1px_5px] inset-shadow-orange-600

function ButtonGrabOrder() {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{
        x: -200,
        opacity: 0,
      }}
      animate={{
        x: [-200, 0],
        opacity: 100,
      }}
      transition={{
        duration: '.5',
        ease: 'easeIn',
      }}
      onClick={() => {
        navigate('/menu');
      }}
      className="sm:px-12 px-8 py-5 sm:py-6 font-bold text-xl sm:text-[1.4rem] bg-[linear-gradient(144deg,#fe6601_0%,#ff852e_75%)] shadow-[1px_3px_6px_0px] shadow-orange-800 inset-shadow-[1px_1px_2px] inset-shadow-orange-700/80 border border-transparent tracking-wider rounded-[14px] cursor-grab text-gray-50 text-shadow-2xs text-shadow-orange-800  hover:inset-shadow-none hover:text-gray-100 hover:bg-amber-300 hover:scale-98 antialiased hover:shadow-none active:scale-95  hover:border hover:border-orange-600 hover:bg-[linear-gradient(144deg,#ff8e3b_0%,#ff6b09_75%)] transition-all duration-300 ease-in-out"
    >
      Grab Your Order
    </motion.button>
  );
}

export default ButtonGrabOrder;
