import { Link } from 'react-router';
import { FaGoogle } from 'react-icons/fa';
import { BiSolidLogInCircle } from 'react-icons/bi';

import { useState } from 'react';
import useLogin from './useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLogging } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
    setEmail('');
    setPassword('');
  }

  return (
    <div className=" w-full h-screen bg-[radial-gradient(circle_farthest-corner_at_center_center,#f5eae2_50%,#ff6f00_100%)]">
      <div className="max-w-[1250px] h-full mx-auto py-10">
        <div className="md:max-w-[730px] lg:max-w-[1000px] xl:max-w-[1200px] h-full mx-auto  flex  justify-center items-center overflow-hidden ">
          <div className="flex flex-col items-center justify-center w-[90%] sm:w-[75%] md:w-[50%] h-full bg-white rounded-md inset-shadow-[1px_1px_5px,-1px_-1px_5px] inset-shadow-gray-300">
            <div className="mx-auto bg-[#f5eae2] clip-custom">
              <Link to="/">
                <img
                  src="./logo-black.png"
                  alt="logo"
                  className="h-25 w-47 lg:h-35 lg:w-65 -mt-[1.2rem] lg:mt-[-1.5rem]"
                />
              </Link>
            </div>
            <div className="flex flex-col items-start justify-center w-full h-full gap-3 px-2 py-2 sm:py-5 xl:py-10 sm:px-5 xl:px-10 md:gap-4 xl:gap-6 sm:flex-1/2">
              <form
                onSubmit={handleLogin}
                className="flex flex-col items-start justify-start w-full gap-5 px-2 font-mono sm:px-5 xl:px-15"
              >
                <div className="flex flex-col-reverse items-start justify-start w-full gap-1">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 lg:p-3 text-gray-500 bg-gray-200 peer border-b-2 border-transparent focus:valid:border-b-green-500 focus:invalid:border-b-red-500 focus:outline-none placeholder:text-sm lg:placeholder:text-[1rem] placeholder:text-gray-400 "
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled={isLogging}
                    required
                  />
                  <label className="px-1 text-sm lg:text-[1rem] font-semibold tracking-wide text-gray-400 transition-all ease-linear sm:px-2 lg:px-3 peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-5 duration-400">
                    Email
                  </label>
                </div>
                <div className="flex flex-col-reverse items-start justify-start w-full gap-1">
                  <Link to="/forgetpassword" className="">
                    <span className="text-blue-400 text-[.85rem]">
                      forget password?
                    </span>
                  </Link>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 lg:p-3 text-gray-500 bg-gray-200 border-b-2 border-transparent peer focus:valid:border-b-green-500 focus:invalid:border-b-red-500 focus:outline-none placeholder:text-sm lg:placeholder:text-[1rem] placeholder:text-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLogging}
                  />
                  <label className="px-1 text-sm lg:text-[1rem] font-semibold tracking-wide text-gray-400 transition-all ease-linear peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-5 duration-400">
                    Password
                  </label>
                </div>

                <button
                  disabled={isLogging}
                  className="w-full flex justify-center items-center gap-2 bg-orange-400 text-[1.1rem] sm:text-[1.2rem] lg:text-[1.4rem] shadow-[0px_2px_5px] rounded-4xl shadow-gray-400 text-gray-50 py-2 tracking-wide font-semibold border-1 text-shadow-2xs text-shadow-orange-900 border-orange-600 cursor-pointer hover:bg-orange-500 transition-all duration-200"
                >
                  <BiSolidLogInCircle />
                  <span>Login</span>
                </button>
              </form>
              <p className="flex items-center justify-center gap-2 mx-auto">
                <span className="h-[2px] w-10 bg-gray-400"></span>
                <span className="text-gray-400 mb-[4px]">or</span>
                <span className="h-[2px] w-10 bg-gray-400"></span>
              </p>
              <div className="flex items-center justify-start w-full px-15 gap-15">
                <p className="text-gray-500">sign with:</p>
                <button className="cursor-pointer p-3 border-1 border-gray-300 rounded-[10px] inset-shadow-[1px_2px_10px_-6px] inset-shadow-gray-300">
                  <FaGoogle className="fill-red-600" />
                </button>
              </div>
              <div className="w-full text-center mb-[-3rem]">
                <span className="text-[.9rem] font-semibold text-gray-600 tracking-wide mr-4">
                  Havn't taken a bite Yet?
                </span>
                <Link
                  to="/signup"
                  className="p-2 text-lg tracking-wide text-orange-400 transition-colors duration-300 ease-in border-2 border-transparent text-shadow-2xs text-shadow-orange-700 rounded-xl font-poetsen hover:border-orange-500 hover:bg-orange-400 hover:text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden flex-1/2 py-5 lg:py-10 mt-[-5rem] w-full h-full md:flex justify-center items-center flex-col">
            <img
              src="./login-image.png"
              alt="login background image"
              loading="lazy"
              className="mx-auto w-70 h-70 md:w-90 md:h-90 lg:h-120 lg:w-120 drop-shadow-[1px_2px_10px] drop-shadow-orange-800"
            />
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem]  md:ml-7 lg:ml-10 font-poetsen text-center text-orange-500 text-shadow-2xs text-shadow-gray-600 tracking-wide">
              " your cravings know the password "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
