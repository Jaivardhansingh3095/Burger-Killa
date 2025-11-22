import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-orange-400/90">
      <div className="flex flex-col items-center justify-center gap-6 max-w-[1200px]">
        <div className="flex flex-col items-center w-full gap-0 text-gray-100 md:gap-10 lg:gap-40 md:flex-row justify-evenly">
          <div className="flex items-start justify-center flex-2/5">
            <div className="flex flex-row items-center justify-center md:justify-between md:items-start md:flex-col">
              <img
                src={`${import.meta.env.VITE_BACKEND}public/img/logo/logo-black.png`}
                className="h-30 w-50 sm:h-40 sm:w-100 md:h-60 md:w-100  md:-mt-[3rem]"
                alt="Burger killa logo white"
                loading="lazy"
              />
              <p className="text-gray-100 pl-0 md:pl-10 text-left md:text-center tracking-wide text-sm sm:text-[1rem] md:text-lg text-wrap  md:-mt-[4rem] font-[600] font-mono">
                "Gourmet burgers, grilled to perfection and stacked with
                swagger"
              </p>
            </div>
          </div>
          <div className="px-5 md:px-0 flex justify-evenly items-start gap-4 text-[.8rem]">
            <div className="flex items-center justify-center flex-1/2">
              <div className="flex flex-col items-start gap-2 justify-evenly">
                <h3 className="text-[1.2rem]">Contacts</h3>
                <div className="flex items-center justify-around gap-3">
                  <FaPhoneAlt className="h-4 fill-gray-100" />
                  <p>
                    +91<span className="ml-1">6375345345</span>
                  </p>
                </div>
                <div className="flex items-center justify-around gap-3">
                  <MdEmail className="h-4 fill-gray-100" />
                  <p className="">jaivardhansingh3095@gmail.com</p>
                </div>
                <div className="flex items-start justify-around gap-3">
                  <FaLocationDot className="h-5 fill-gray-100" />
                  <p className="text-wrap">
                    Burger Killa, opposite Kardhani Heights, Govindpura,
                    Jhotwara, Jaipur, Rajasthan, 302012
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start flex-1/2">
              <div className="flex flex-col items-start justify-start gap-2 ">
                <h3 className="text-[1.2rem]">Legal</h3>
                <p>Terms & conditions</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] h-[.1rem] bg-white rounded-4xl"></div>
        <div className="w-full flex justify-start items-center mb-[2rem] px-10 xl:px-0">
          <div className="text-gray-100 mr-auto text-[.8rem]">
            <p>
              <span>&copy;</span> Copyright. All rights reserved.
              <br />
              Develop by
              <a
                href="https://github.com/Jaivardhansingh3095"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 cursor-pointer text-[.9rem] ml-2 border-b-2 border-transparent hover:border-gray-100 hover:text-gray-100 transition-all duration-150 ease-linear"
              >
                Jaivardhan
              </a>
            </p>
          </div>
          <div className="flex items-center justify-around gap-2">
            <FaFacebook className="w-8 h-8 cursor-pointer fill-gray-100" />
            <FaInstagram className="w-8 h-8 cursor-pointer fill-gray-100" />
            <FaSquareXTwitter className="w-8 h-8 cursor-pointer fill-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
