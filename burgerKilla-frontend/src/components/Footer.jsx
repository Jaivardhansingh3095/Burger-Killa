import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <div className="bg-orange-400/90 w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-6 max-w-[1200px]">
        <div className="flex justify-evenly items-center w-full gap-40 text-gray-100">
          <div className="flex-2/5 flex justify-center items-start">
            <div className="flex flex-col justify-between items-start">
              <img
                src="./logo-white.png"
                className="h-60 w-100 mt-[-3rem]"
                alt="Burger killa logo white"
              />
              <p className="text-gray-100 text-center tracking-wide text-[1.1rem] text-wrap mt-[-4rem] font-[600] font-mono">
                "Gourmet burgers, grilled to perfection and stacked with
                swagger"
              </p>
            </div>
          </div>
          <div className="flex justify-evenly items-start gap-4 text-[.8rem]">
            <div className="flex-1/2 flex justify-center items-center">
              <div className="flex flex-col justify-evenly items-start gap-2">
                <h3 className="text-[1.2rem]">Contacts</h3>
                <div className="flex justify-around items-center gap-3">
                  <FaPhoneAlt className="fill-gray-100 h-4" />
                  <p>
                    +91<span className="ml-1">6375345345</span>
                  </p>
                </div>
                <div className="flex justify-around items-center gap-3">
                  <MdEmail className="fill-gray-100 h-4" />
                  <p className="">jaivardhansingh3095@gmail.com</p>
                </div>
                <div className="flex justify-around items-start gap-3">
                  <FaLocationDot className="fill-gray-100 h-5" />
                  <p className="text-wrap">
                    Burger Killa, opposite Kardhani Heights, Govindpura,
                    Jhotwara, Jaipur, Rajasthan, 302012
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1/2 flex justify-start items-center">
              <div className=" flex flex-col justify-start items-start gap-2">
                <h3 className="text-[1.2rem]">Legal</h3>
                <p>Terms & conditions</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] h-[.1rem] bg-white rounded-4xl"></div>
        <div className="w-full flex justify-start items-center mb-[2rem]">
          <div className="text-gray-100 mr-auto text-[.8rem]">
            <p>
              <span>&copy;</span> Copyright. All rights reserved.
              <br />
              Design by
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
          <div className="flex justify-around items-center gap-2">
            <FaFacebook className="h-8 w-8 fill-gray-100 cursor-pointer" />
            <FaInstagram className="h-8 w-8 fill-gray-100 cursor-pointer" />
            <FaSquareXTwitter className="h-8 w-8 fill-gray-100 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
