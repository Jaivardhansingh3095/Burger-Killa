import { Link } from 'react-router';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import useLogin from './useLogin';

//bg-[linear-gradient(0deg,#ffaa00_20%,#febe45_25%,#ffd682_35%,#ffecc7_45%,#fff3dc_50%,#ffecc7_55%,#ffd682_65%,#febe45_75%,#ffaa00_80%)]
//bg-[linear-gradient(#ffbb5f_40%,#ffcb88_100%)]

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
    <div className=" w-full h-[100vh] bg-[radial-gradient(circle_farthest-corner_at_top_left,#fa9100_60%,#ffa72c_70%,#ffbb5f_80%,#ffcb88_90%,#ffe3c0_100%)]">
      <div className="max-w-[1250px] h-full mx-auto py-10">
        <div className="max-w-[1000px] h-full mx-auto bg-white rounded-[5px] flex flex-col justify-start items-start overflow-hidden">
          <div className="mx-auto clip-custom bg-[radial-gradient(circle_farthest-corner_at_top_left,#fa9100)]">
            <Link to="/">
              <img
                src="./logo-black.png"
                alt="logo"
                className="h-35 w-65 mt-[-1.5rem]"
              />
            </Link>
          </div>
          <div className="h-full w-full flex justify-start items-center">
            <div className="flex-1/2 py-10 mt-[-5rem] w-full h-full flex justify-center items-start flex-col">
              <img
                src="./login-image.png"
                alt="login background image"
                loading="lazy"
                className="h-120 w-120 drop-shadow-[2px_2px_15px] drop-shadow-amber-600"
              />
              <p className="text-[1.5rem] ml-15 font-poetsen text-center text-orange-500 text-shadow-2xs text-shadow-gray-600 tracking-wide">
                " your cravings know the password "
              </p>
            </div>
            <div className="flex-1/2 w-full h-full px-10 py-10 gap-6 flex flex-col justify-center items-start">
              <form
                onSubmit={handleLogin}
                className="w-full px-15 font-mono gap-8 flex flex-col justify-start items-start"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="border-1 w-full p-3 border-gray-200 bg-gray-100 focus:outline-none text-gray-500"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={isLogging}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border-1 w-full p-3 border-gray-200 bg-gray-100 focus:outline-none text-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLogging}
                />
                <Link to="/forgetpassword" className="mt-[-1.5rem] mb-[1rem]">
                  <span className="text-blue-400 text-[.85rem]">
                    forget password?
                  </span>
                </Link>
                <button
                  disabled={isLogging}
                  className="w-full bg-orange-400 text-[1.4rem] text-gray-50 py-2 tracking-widest font-semibold border-1 border-orange-600 cursor-pointer hover:bg-orange-500 transition-all duration-200"
                >
                  LOGIN
                </button>
              </form>
              <p className="mx-auto flex justify-center items-center gap-2">
                <span className="h-[2px] w-10 bg-gray-400"></span>
                <span className="text-gray-400 mb-[4px]">or</span>
                <span className="h-[2px] w-10 bg-gray-400"></span>
              </p>
              <div className="w-full px-15 flex justify-start items-center gap-15">
                <p className="text-gray-500">sign with:</p>
                <button className="cursor-pointer p-3 border-1 border-gray-300 rounded-[10px] inset-shadow-[1px_2px_10px_-6px] inset-shadow-gray-300">
                  <FaGoogle className="fill-red-600" />
                </button>
              </div>
              <div className="w-full text-center mb-[-3rem]">
                <span className="text-[.9rem] font-semibold text-gray-600 tracking-wide mr-4">
                  Havn't taken a bite Yet?
                </span>
                <Link to="/signup" className="text-orange-400 font-poetsen">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
