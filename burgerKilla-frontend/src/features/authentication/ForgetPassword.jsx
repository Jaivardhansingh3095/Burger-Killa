import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router';
import { useForgetPassword } from './useForgetPassword';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const { forgetPassword, isPending } = useForgetPassword();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    forgetPassword({ email });
    setEmail('');
  }

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="max-w-[1250px] h-full mx-auto flex justify-center items-start">
        <div className="w-[90%] md:w-[75%] lg:w-[60%] pt-10 sm:pt-15 flex flex-col justify-start items-center gap-10">
          <div className="flex items-center justify-start w-full p-5 bg-white rounded-xl shadow-[1px_2px_5px_3px] shadow-gray-300">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-500 sm:text-lg 2xl:text-2xl"
            >
              <MdOutlineKeyboardArrowLeft className="w-5 h-5 sm:w-7 sm:h-7 2xl:w-9 2xl:h-9" />
              <span>back to Login</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-full py-5 sm:py-8 px-3 sm:px-8 bg-white shadow-[1px_2px_5px_3px] shadow-gray-300 rounded-xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center w-full gap-10 px-0 md:px-20"
            >
              <div className="flex flex-col items-start justify-center w-full gap-2">
                <label
                  htmlFor="email"
                  className="text-sm  lg:text-[16px] 2xl:text-lg font-semibold text-gray-500 tracking-wide"
                >
                  Email address
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  className="w-full p-3 text-sm text-center text-gray-600 bg-gray-100 border-2 border-gray-200 rounded-sm 2xl:p-5 lg:text-lg 2xl:text-2xl focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                disabled={isPending}
                className="px-6 py-3 text-sm sm:text-lg font-semibold tracking-wide bg-blue-400 rounded-lg text-gray-50 2xl:text-2xl text-shadow-2xs text-shadow-blue-800 shadow-[1px_2px_5px_1px] shadow-blue-600 cursor-pointer hover:scale-102 active:scale-100 transition-transform duration-300 ease-in-out"
              >
                Request Password Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
