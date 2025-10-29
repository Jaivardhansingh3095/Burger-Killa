import { useState } from 'react';

import { TbPassword } from 'react-icons/tb';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import { useResetPassword } from './useResetPassword';
import { Link, useParams } from 'react-router';

function ResetPassword() {
  const params = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { resetPassword, isResetting, isSuccess } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) return;

    resetPassword({ email, password, token: params.resetToken });

    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }

  function handleReset(e) {
    e.preventDefault();

    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }

  if (isSuccess) {
    return (
      <div className="w-full h-screen bg-gray-100">
        <div className="max-w-[1250px] w-full h-full mx-auto flex justify-center items-center">
          <div className="w-[90%] md:w-[75%] lg:w-[60%] flex flex-col justify-center items-center gap-10 px-5 py-15 bg-white rounded-lg shadow-[1px_3px_5px_2px] shadow-gray-400">
            <span className="text-sm sm:text-[16px] lg:text-lg font-semibold text-gray-600 tracking-wide text-center">
              Thank you for your patience. Your password has been{' '}
              <span className="font-bold text-green-500 uppercase">
                updated
              </span>
              .
            </span>
            <Link
              to="/"
              className="px-8 py-2 text-sm font-bold tracking-wider transition-colors duration-300 ease-in bg-orange-500 rounded-lg outline-none text-gray-50 sm:text-lg lg:text-xl text-shadow-2xs text-shadow-orange-900 hover:bg-orange-400"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="max-w-[1250px] h-full mx-auto flex justify-center items-start">
        <div className="w-[90%] md:w-[75%] lg:w-[60%] flex flex-col justify-start items-center gap-5 h-full">
          <div className="bg-amber-500 clip-custom">
            <img
              src={`${import.meta.env.VITE_BACKEND}public/img/logo/logo-white.png`}
              alt="logo"
              className="h-35 w-65 mt-[-1.6rem] focus:outline-none drop-shadow-[0px_3px_1px] drop-shadow-gray-900"
            />
          </div>

          <div className="w-full p-5 bg-white rounded-xl shadow-[1px_2px_5px_3px] shadow-gray-300 flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start justify-center w-full gap-10 px-5 py-5 md:px-20"
            >
              <div className="flex flex-col items-start justify-start w-full gap-2">
                <label
                  htmlFor="email"
                  className="font-semibold tracking-wide text-gray-600/85 text-[.8rem] sm:text-sm lg:text-[1rem]"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-2 py-1 text-sm font-semibold text-gray-600 bg-gray-200 border-b-2 outline-none lg:text-lg md:px-5 md:py-2 border-b-transparent focus:border-b-gray-400 placeholder:font-normal placeholder:text-gray-400"
                  placeholder="your email address"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isResetting}
                />
              </div>
              <div className="flex flex-col items-start justify-start w-full gap-2">
                <label
                  htmlFor="password"
                  className="font-semibold tracking-wide text-gray-600/85 text-[.8rem] sm:text-sm lg:text-[1rem]"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-2 py-1 text-sm font-semibold text-gray-600 bg-gray-200 border-b-2 outline-none lg:text-lg md:px-5 md:py-2 border-b-transparent focus:border-b-gray-400 placeholder:font-normal placeholder:text-gray-400"
                  placeholder="your new password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isResetting}
                />
              </div>
              <div className="flex flex-col items-start justify-start w-full gap-2">
                <label
                  htmlFor="password-confirm"
                  className="font-semibold tracking-wide text-gray-600/85 text-[.8rem] sm:text-sm lg:text-[1rem]"
                >
                  Password Confirm
                </label>
                <input
                  type="password"
                  className="w-full px-2 py-1 text-sm font-semibold text-gray-600 bg-gray-200 border-b-2 outline-none lg:text-lg md:px-5 md:py-2 border-b-transparent focus:border-b-gray-400 placeholder:font-normal placeholder:text-gray-400"
                  placeholder="confirm new password"
                  id="password-confirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  disabled={isResetting}
                />
              </div>

              {password && passwordConfirm && password === passwordConfirm ? (
                <div className="flex items-center justify-start gap-2 text-sm font-semibold tracking-wide text-green-500 md:text-lg">
                  <TbPassword className="w-6 h-6" />
                  <span>Password match</span>
                </div>
              ) : password &&
                passwordConfirm &&
                password !== passwordConfirm ? (
                <div className="flex items-center justify-start gap-2 text-sm font-semibold tracking-wide text-red-500 md:text-lg">
                  <MdOutlineDoNotDisturbAlt className="w-6 h-6" />
                  <span>Password don't match</span>
                </div>
              ) : (
                <div className="w-full text-sm font-semibold tracking-wide text-transparent md:text-lg">
                  No text
                </div>
              )}
              <div className="flex items-start justify-between w-full">
                <input
                  type="reset"
                  value="Cancel"
                  onClick={handleReset}
                  disabled={isResetting}
                  className="px-5 lg:text-lg py-3 mx-auto text-xs sm:text-[16px] font-bold tracking-wider border-2 cursor-pointer sm:px-15 lg:py-4 text-rose-500 border-rose-500 rounded-4xl hover:bg-rose-500 hover:text-gray-50 transition-colors duration-300 ease-linear"
                />

                <button
                  disabled={isResetting}
                  className="px-5 border-2 border-transparent text-xs sm:px-15 mx-auto py-3 lg:py-4 text-gray-50 font-bold tracking-wider text-shadow-2xs text-shadow-blue-900 sm:text-sm sm:text-[16px] lg:text-lg bg-[radial-gradient(ellipse_farthest-corner_at_center_center,#0d96ff_50%,#36a6ff_70%,#71bdff_90%,#b0d5ff_100%)] outline-none rounded-4xl inset-shadow-[1px_-1px_1px] inset-shadow-blue-800 cursor-pointer hover:bg-[linear-gradient(90deg,rgba(226,226,226,0.1)_20%,rgba(179,179,179,0.1)_80%,rgba(226,226,226,0.1)_100%),radial-gradient(ellipse_farthest-corner_at_center_center,#0d96ff_50%,#36a6ff_70%,#71bdff_90%,#b0d5ff_100%)]  transition-all duration-300 ease-linear"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
