import { GiChickenLeg, GiHamburger } from 'react-icons/gi';
import { FaFire } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';

import { motion } from 'motion/react';

import Nav from '../../../components/Nav';
import ButtonGrabOrder from '../../../components/ButtonGrabOrder';
import ButtonVideo from '../../../components/ButtonVideo';

function Header() {
  return (
    <header className="h-auto py-10 sm:py-0 lg:h-screen bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="w-full lg:max-w-[1000px] xl:max-w-[1250px] mx-auto flex justify-center items-center h-full">
        <div className="flex flex-col items-center justify-center gap-10 px-5 sm:mr-auto lg:px-3 lg:flex-1/3">
          <div className="flex flex-col items-center justify-center gap-8 px-10 sm:px-0 sm:justify-evenly sm:flex-2/3">
            <h1 className="text-2xl font-extrabold leading-normal tracking-widest text-center sm:text-start md:text-3xl lg:text-4xl xl:text-5xl font-poetsen text-shadow-2xs text-shadow-amber-600 text-wrap ">
              Your{' '}
              <span className="text-orange-400 text-shadow-2xs text-shadow-orange-900">
                Gateway To
              </span>{' '}
              Gourmet Burger <span className="hidden sm:block">🍔</span>
            </h1>
            <p className="font-[700] text-wrap antialiased tracking-wide sm:block hidden">
              at Burger-Killa, we're dedicated to crafting the most delectable
              burgers that tantalize your taste buds.
            </p>
            <div className="flex items-center justify-center w-full gap-10 sm:justify-start sm:min-w-36">
              <ButtonGrabOrder />
            </div>
          </div>
          <div className="items-center justify-center hidden gap-5 font-semibold sm:flex md:gap-15">
            <div className="flex items-center justify-center h-20 gap-2 w-42 lg:h-25 lg:w-45 bg-yellow-200/40 rounded-xl">
              <GiChickenLeg className="px-3 py-3 ml-2 border-orange-500 h-14 w-15 lg:w-20 fill-orange-400 bg-white/75 lg:h-17 border-1 rounded-4xl" />
              <p className="text-[.8rem] text-gray-600 text-wrap">
                Farm Sourced Meat
              </p>
            </div>
            <div className="flex items-center justify-center h-20 gap-2 w-42 lg:h-25 lg:w-45 bg-yellow-200/40 rounded-xl">
              <GiHamburger className="px-3 py-3 ml-2 border-orange-500 w-15 lg:w-20 fill-orange-400 bg-white/75 h-14 lg:h-17 border-1 rounded-4xl" />
              <p className="text-[.8rem] text-gray-600 text-wrap">
                Freshly Baked Bread
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-full gap-3 sm:hidden">
            <img
              src={`${import.meta.env.VITE_BACKEND}public/img/hero-image.png`}
              alt="Burger with dripping cheese hero image"
              loading="lazy"
              className="h-50 w-40 mx-auto drop-shadow-[0px_2px_50px] drop-shadow-orange-300"
            />
            <img
              src={`${import.meta.env.VITE_BACKEND}public/img/hero-image-2.png`}
              alt="Burger with dripping cheese hero image"
              loading="lazy"
              className="h-50 w-40 mx-auto drop-shadow-[0px_2px_50px] drop-shadow-orange-300"
            />
          </div>
        </div>
        <div className="hidden w-full h-full px-0 md:px-5 lg:flex-2/3 pb-50 sm:block ">
          <div className="relative w-full h-full lg:grid lg:rid-cols-[repeat(4,1fr)] lg:grid-rows-[repeat(4,1fr)] gap-2">
            <div className="z-100 w-full h-full lg:mt-[-5rem] lg:col-span-3 lg:row-span-3 lg:col-start-2 lg:row-start-2">
              <img
                src={`${import.meta.env.VITE_BACKEND}public/img/hero-image.png`}
                alt="Burger with dripping cheese hero image"
                loading="lazy"
                className="h-50 w-50 sm:h-100 sm:w-120 lg:h-110 lg:w-130 xl:h-140 xl:w-145 mx-auto drop-shadow-[0px_2px_50px] drop-shadow-orange-300"
              />
            </div>
            <motion.div
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: '.7',
                ease: 'easeIn',
              }}
              className="absolute left-0 z-10 hidden lg:block lg:left-15 top-10 "
            >
              <img
                src={`${import.meta.env.VITE_BACKEND}public/img/hero-3-image.png`}
                alt="Mojito mocktail hero image"
                className="w-80 h-80 xl:w-100 xl:h-100 drop-shadow-[0px_2px_10px] drop-shadow-cyan-200"
              />
            </motion.div>
            <motion.div
              initial={{
                x: -150,
              }}
              animate={{
                x: [-150, 0],
                opacity: [0, 100],
              }}
              transition={{
                duration: '1',
                ease: 'easeInOut',
              }}
              className="relative hidden h-20 col-start-1 row-start-4 lg:block z-110 w-35"
            >
              <div className="absolute -top-10 left-20 xl:top-20 xl:left-40 p-5 rounded-2xl flex justify-center items-center w-full h-full bg-[linear-gradient(130deg,rgba(212,212,212,0.80)_0%,rgba(241,241,241,0.93)_80%)]">
                <span className="flex items-center justify-center font-semibold text-center text-gray-500 text-wrap">
                  <span>Juicy Savory</span>
                  <GiMeat className="w-8 h-8 fill-gray-700" />
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{
                x: 150,
              }}
              animate={{
                x: [150, 0],
                opacity: [0, 100],
              }}
              transition={{
                duration: '1',
                ease: 'easeInOut',
              }}
              className="relative hidden h-20 col-start-4 row-start-1 lg:block z-110 w-35"
            >
              <div className="absolute top-30 left-[-3rem] p-10 rounded-2xl flex justify-center items-center w-full h-full bg-[linear-gradient(130deg,rgba(212,212,212,0.80)_0%,rgba(241,241,241,0.93)_80%)]">
                <span className="flex items-center justify-center gap-1 font-semibold text-center text-gray-500 text-wrap">
                  <span>Spicy Hot</span>
                  <FaFire className="w-8 h-8 fill-gray-700" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
