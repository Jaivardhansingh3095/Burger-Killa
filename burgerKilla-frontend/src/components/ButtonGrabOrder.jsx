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
      className="sm:px-12 px-8 overflow-hidden py-5 sm:py-6 font-bold text-xl sm:text-[1.4rem] bg-[linear-gradient(144deg,#fe6601_0%,#ff852e_75%)] shadow-[1px_3px_10px_0px] shadow-orange-800 inset-shadow-[1px_1px_2px] inset-shadow-orange-700/80 tracking-wider rounded-[14px] cursor-grab text-gray-50 text-shadow-2xs text-shadow-orange-800 hover:-translate-y-1  hover:text-gray-100 antialiased active:translate-y-0 active:scale-98 active:shadow-[1px_2px_5px_0px] transition-all duration-300 ease-in-out before:bg-[linear-gradient(to_right,#ffffff00_0%,#fff_50%,#ffffff00_100%)] before:w-full relative before:absolute before:top-0 before:-left-[100%] before:h-full before:-skew-x-[20deg] hover:before:left-[100%] before:opacity-10 before:transition-all before:duration-300 before:ease-out"
    >
      Grab Your Order
    </motion.button>
  );
}

export default ButtonGrabOrder;
