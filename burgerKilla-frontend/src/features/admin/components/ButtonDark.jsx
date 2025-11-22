import { IoIosSunny } from 'react-icons/io';
import { IoIosMoon } from 'react-icons/io';

import { motion } from 'motion/react';

import { useDakMode } from '../../../context/DarkModeContext';

function ButtonDark() {
  const [themeSelected, handleTheme] = useDakMode();
  return (
    <div className="relative flex items-center justify-center bg-gray-200 rounded-4xl">
      <button
        onClick={() => handleTheme('light')}
        className="z-10 cursor-pointer flex items-end justify-center gap-1 px-3 py-1.5"
      >
        <IoIosSunny
          className={`z-11 ${themeSelected === 'light' ? 'fill-white' : 'fill-text-primary'}`}
        />
        <span
          className={`text-xs font-bold z-11 ${themeSelected === 'light' ? 'text-white' : 'text-text-primary'}`}
        >
          Light
        </span>
      </button>
      <button
        onClick={() => handleTheme('dark')}
        className="z-10 cursor-pointer flex items-center justify-center gap-1 px-3 py-1.5"
      >
        <IoIosMoon
          className={`z-11 ${themeSelected === 'dark' ? 'fill-white' : ''}`}
        />
        <span
          className={`z-11 text-xs font-bold ${themeSelected === 'dark' ? 'text-white' : ''}`}
        >
          Dark
        </span>
      </button>
      <div
        className={`cursor-pointer absolute top-0 left-0 z-0 w-full h-full flex ${themeSelected === 'light' ? 'justify-start' : 'justify-end'}`}
      >
        <motion.span
          layout
          transition={{
            type: 'spring',
            damping: '15',
            stiffness: '250',
          }}
          className="w-1/2 h-full bg-primary dark:bg-primary-dark rounded-4xl"
        />
      </div>
    </div>
  );
}

export default ButtonDark;
