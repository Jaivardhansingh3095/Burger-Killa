import { ImCancelCircle } from 'react-icons/im';

import { useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

import MenuCategories from './MenuCategories';
import Category from './Category';

const menuItems = [
  { name: 'Burgers', quantity: 12, image: './icons-svg/burger-icon.svg' },
  { name: 'Wraps', quantity: 12, image: './icons-svg/wrap.svg' },
  { name: 'Meals', quantity: 12, image: './icons-svg/burger-meal-icon.svg' },
  { name: 'Munchies', quantity: 12, image: './icons-svg/fried-chicken.svg' },
  {
    name: 'Milkshakes',
    quantity: 12,
    image: './icons-svg/milkshake-icon.svg',
  },
  {
    name: 'Refreshments',
    image: './icons-svg/soda-drink.svg',
  },
  { name: 'Desserts', quantity: 12, image: './icons-svg/dessert-icon.svg' },
];

function MenuModalView({ handleModalClose }) {
  const [searchParams, setSearchParams] = useSearchParams({
    categories: 'burger',
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          translateX: '150px',
          opacity: 0,
        }}
        animate={{
          opacity: 100,
          translateX: ['150px', '-20px', '0px'],
        }}
        transition={{
          duration: '1',
          ease: 'linear',
        }}
        exit={{
          opacity: 0,
        }}
        onClick={(e) => e.stopPropagation()}
        className="absolute -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] h-[80%] w-[90%]  sm:h-[70%] sm:w-[60%] mx-auto"
      >
        <div className="relative flex flex-col items-center w-full h-full">
          <h3 className="w-full py-1 text-lg text-center bg-white rounded-tl-xl rounded-tr-xl">
            Categories
          </h3>
          <div className="flex flex-col items-center w-full h-full text-gray-900 bg-gray-50 ">
            {menuItems.map((item) => (
              <Category
                key={item.name}
                item={item}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
                handleModalClose={handleModalClose}
              />
            ))}
          </div>

          <div
            role="button"
            onClick={handleModalClose}
            className="absolute left-[50%] -translate-x-[50%] flex items-center justify-center -top-10 sm:-top-12"
          >
            <ImCancelCircle className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MenuModalView;
