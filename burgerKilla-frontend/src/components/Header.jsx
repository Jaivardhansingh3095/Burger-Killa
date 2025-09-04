import { GiChickenLeg, GiHamburger } from 'react-icons/gi';

import Nav from './Nav';
import ButtonGrabOrder from './ButtonGrabOrder';
import ButtonVideo from './ButtonVideo';

function Header() {
  return (
    <header className=" h-screen bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="max-w-[1250px] mx-auto flex justify-center items-center h-full">
        <div className="flex-1/3 h-[30rem] px-3 gap-18 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 justify-evenly flex-2/3 items-center">
            <h1 className="font-extrabold font-poetsen leading-normal text-5xl text-shadow-2xs text-shadow-gray-900 text-wrap antialiased tracking-widest  ">
              Your{' '}
              <span className="text-orange-400 text-shadow-2xs text-shadow-gray-900">
                Gateway To
              </span>{' '}
              Gourmet Burger <span>🍔</span>
            </h1>
            <p className="font-[700] text-wrap antialiased tracking-wide">
              at Burger-Killa, we're dedicated to crafting the most delectable
              burgers that tantalize your taste buds.
            </p>
            <div className="w-full flex justify-start items-center min-w-36 gap-10">
              <ButtonGrabOrder />
            </div>
          </div>
          <div className="flex items-center justify-center gap-15 font-semibold">
            <div className="h-25 w-45 bg-yellow-200/40 rounded-xl flex items-center justify-center gap-2">
              <GiChickenLeg className="fill-orange-400 bg-white/75 ml-2 h-17 w-20 border-1 border-orange-500 rounded-4xl py-3 px-3" />
              <p className="text-[.8rem] text-gray-600 text-wrap">
                Farm Sourced Meat
              </p>
            </div>
            <div className="h-25 w-45 bg-yellow-200/40 rounded-xl flex items-center justify-center gap-2">
              <GiHamburger className="fill-orange-400 bg-white/75 ml-2 h-17 w-20 border-1 border-orange-500 rounded-4xl py-3 px-3" />
              <p className="text-[.8rem] text-gray-600 text-wrap">
                Freshly Baked Bread
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-2/3"></div>
      </div>
    </header>
  );
}

export default Header;
