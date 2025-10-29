import { Link } from 'react-router';

function SnacksSection() {
  return (
    <section className="w-full h-auto bg-white lg:h-screen ">
      <div className="max-w-[1250px] w-full mx-auto h-full px-0 lg:px-5">
        <div className="flex flex-col items-center justify-center w-full h-full lg:flex-row">
          <div className="flex flex-col items-start justify-start w-full h-full gap-8 px-5 py-20 sm:px-20 lg:px-5 lg:py-30 flex-4/12">
            <h2 className="text-2xl text-gray-600 md:text-3xl xl:text-4xl font-poetsen">
              <span className="text-amber-500 text-shadow-2xs text-shadow-amber-900">
                Gourmet Bites
              </span>
              , Anytime
            </h2>
            <p className="font-semibold text-gray-500">
              From cheesy wraps to spicy sides, our snacks are crafted to
              satisfy every craving in style.
            </p>
            <Link
              to="/menu?categories=munchie"
              className="mt-5 lg:mt-10 px-7 py-3 sm:py-4 bg-[#ff9021] rounded-4xl text-white font-poetsen font-light tracking-wider text-sm sm:text-[1rem] lg:text-lg shadow-[0px_10px_25px] shadow-orange-400/60 cursor-pointer hover:bg-[#ff9934]"
            >
              find out more
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-full flex-7/12 lg:grid grid-cols-[repeat(6, 1fr)] gid-rows-[repeat(6,1fr)] gap-20 lg:gap-5 pb-10 lg:pb-0">
            <div className="flex items-center justify-center col-span-2 row-span-6 gap-10 px-5 sm:px-20 lg:px-0">
              <div className="relative h-full lg:h-[70%] w-full flex justify-center items-center bg-[linear-gradient(160deg,#ffb8d7_0%,#ff6cb1_40%,#f347a2_55%,#f42c97_70%,#ee1686_90%)] rounded-xl shadow-[1px_3px_5px_2px] shadow-rose-900">
                <img
                  src={`${import.meta.env.VITE_BACKEND}public/img/home/strawberry-shake-original.png`}
                  className="w-50 h-60 sm:w-60 sm:h-80 md:w-80 md:h-100 lg:w-90 lg:h-110 drop-shadow-[1px_1px_15px] drop-shadow-gray-50"
                />
                <span className="hidden lg:block absolute top-[60%] left-[50%] -translate-x-[50%] text-white text-6xl lg:text-7xl font-neonderthaw -rotate-25">
                  Delicious
                </span>
              </div>
              <span className="block text-xl sm:text-2xl text-wrap text-rose-500 lg:hidden font-poetsen">
                Sip sass, taste class—this shake slaps! 🍓
              </span>
            </div>
            <div className="flex items-center justify-center col-span-3 row-span-3 gap-10 px-5 sm:px-20 lg:px-0">
              <span className="block text-xl sm:text-2xl text-amber-600 text-wrap lg:hidden font-poetsen">
                Crunch with punch—this chicken’s got swagger! 🍗
              </span>
              <div className="relative w-full flex justify-center items-center bg-[linear-gradient(160deg,#ffbb80_0%,#ffa855_40%,#ff9d3b_55%,#ff8e22_70%,#ff8510_90%)] rounded-xl shadow-[1px_3px_5px_2px] shadow-orange-700">
                <img
                  src={`${import.meta.env.VITE_BACKEND}public/img/home/fried-chicken-wings.png`}
                  className="w-60 h-50 sm:w-90 sm:h-80 md:w-110 md:h-100 lg:h-full lg:w-90 drop-shadow-[1px_1px_15px] drop-shadow-gray-50"
                />
                <span className="hidden lg:block absolute top-[50%] left-[50%] -translate-x-[50%] text-white text-6xl lg:text-7xl font-neonderthaw -rotate-25">
                  Crunchy
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-3 col-start-3 row-span-3 row-start-4 gap-10 px-5 sm:px-20 lg:px-0">
              <div className="relative w-full flex justify-center items-center bg-[linear-gradient(160deg,#ffdf88_0%,#ffcb57_40%,#ffc140_55%,#ffb727_70%,#ffad0d_90%)] rounded-xl shadow-[1px_3px_5px_2px] shadow-amber-700">
                <img
                  src={`${import.meta.env.VITE_BACKEND}public/img/home/peri-peri-fries.png`}
                  className="lg:h-full w-60 h-50 sm:w-90 sm:h-80 md:w-110 md:h-100 lg:w-70 drop-shadow-[1px_1px_15px] drop-shadow-gray-50"
                />
                <span className="hidden lg:block absolute top-[50%] left-[50%] -translate-x-[50%] text-white text-6xl lg:text-8xl font-neonderthaw -rotate-25">
                  Spicy
                </span>
              </div>
              <span className="block text-xl text-yellow-400 sm:text-2xl text-wrap lg:hidden font-poetsen">
                Spice meets crunch—these fries fire up fun! 🍟
              </span>
            </div>
            {/* <div className="col-span-2 col-start-6 row-span-6 row-start-1 bg-purple-300"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SnacksSection;

// .div4 {
//     grid-row: span 6 / span 6;
//     grid-column-start: 5;
//     grid-row-start: 1;
// }
