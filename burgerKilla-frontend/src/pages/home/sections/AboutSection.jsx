import { GiHamburger } from 'react-icons/gi';
import { LiaPizzaSliceSolid } from 'react-icons/lia';
import { GiFrenchFries } from 'react-icons/gi';
import { IoIosIceCream } from 'react-icons/io';
import { PiConfettiLight } from 'react-icons/pi';
import { Link } from 'react-router';

// #FFD392

function AboutSection() {
  return (
    <section className="w-full h-auto bg-white sm:h-screen ">
      <div className="max-w-[1250px] w-full mx-auto h-full py-15 sm:py-5">
        <div className="relative flex flex-col-reverse items-center justify-center w-full h-full gap-5 md:flex-row md:gap-0">
          <div className="flex items-center justify-center w-full h-full gap-5 sm:gap-0 md:flex-3/5">
            <div className="flex items-center justify-center h-full md:relative flex-1/2 md:block">
              <div className="md:absolute h-[100%] md:h-[60%] lg:h-[70%] w-[80%] bg-gray-700 md:top-[60%] md:-translate-y-[50%]  md:left-[50%] md:-translate-x-[50%] rounded-[10rem] flex justify-center items-center">
                <img
                  src={`${import.meta.env.VITE_BACKEND}public/img/home/about-section-image-1.png`}
                  className="h-55 w-45 sm:w-65 sm:h-70 md:w-50 lg:w-75 md:h-55 lg:h-80 drop-shadow-[0px_10px_10px] drop-shadow-amber-500/50"
                  alt="about section mutton gourmet burger"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex items-center justify-center h-full md:relative flex-1/2 md:block">
              <div className="md:absolute h-[100%] md:h-[60%] lg:h-[70%] w-[80%] bg-[#FFD392] md:top-[10%] md:left-[50%] md:-translate-x-[50%] rounded-[10rem] flex justify-center items-center">
                <img
                  src={`${import.meta.env.VITE_BACKEND}public/img/home/about-section-image-2.png`}
                  className=" h-55 w-45 sm:w-65 sm:h-70 md:w-50 lg:w-75 md:h-55 lg:h-75 drop-shadow-[0px_15px_10px] drop-shadow-gray-100/65"
                  alt="about section mutton gourmet burger"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="w-[90%] md:w-[70%] mx-auto flex flex-col items-start justify-center h-full gap-5 px-5 md:flex-2/5">
            <h2 className="pb-6 text-lg font-semibold tracking-wider text-gray-600 border-b-1 border-b-gray-300 sm:text-xl lg:text-2xl xl:text-4xl font-poetsen text-shadow-2xs text-shadow-orange-800">
              <span className="text-amber-500">Crafting Flavourful</span>{' '}
              Memories
            </h2>
            <p className="pb-5 font-light text-gray-500 border-b-1 border-b-gray-300">
              <span className="font-normal font-poetsen text-amber-400">
                Burger Killa
              </span>{' '}
              is a gourmet burger destination where bold flavors meet premium
              ingredients. We craft every burger with passion—from juicy patties
              and artisanal buns to house-made sauces and fresh toppings.
              Whether you're craving a classic or a killer twist, our menu is
              designed to satisfy with style.{' '}
              <span className="font-normal text-amber-500 font-poetsen">
                Taste the difference.
              </span>{' '}
              <span className="font-poetsen">Kill the craving.</span>
            </p>
            <Link
              to="/menu"
              className="mt-2 px-7 py-3 sm:py-5 bg-[#ff9021] rounded-4xl text-white font-poetsen font-light tracking-wider text-sm sm:text-[1rem] lg:text-lg shadow-[0px_10px_25px] shadow-orange-400/60 cursor-pointer hover:bg-[#ff9934]"
            >
              find out more
            </Link>
          </div>
          <div className="hidden lg:block absolute top-[4%] left-[4%] -rotate-60 ">
            <GiHamburger className="w-17 h-17 fill-orange-300" />
          </div>
          <div className="hidden lg:block absolute top-[80%] left-[35%] rotate-30 ">
            <GiFrenchFries className="w-17 h-17 fill-orange-300" />
          </div>
          <div className="hidden lg:block absolute top-[4%] left-[90%] rotate-30">
            <IoIosIceCream className="w-17 h-17 fill-orange-300" />
          </div>
          <div className="hidden lg:block absolute top-[80%] left-[85%] rotate-30">
            <LiaPizzaSliceSolid className="w-20 h-20 fill-orange-300" />
          </div>
          <div className="hidden lg:block absolute top-[4%] left-[60%] rotate-30">
            <PiConfettiLight className="w-20 h-20 fill-orange-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
