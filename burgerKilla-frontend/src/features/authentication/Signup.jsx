import { Link } from 'react-router';
import { FaBurger } from 'react-icons/fa6';
import { useState } from 'react';
import RadioGroup from '../../components/RadioGroup';
import toast from 'react-hot-toast';
import useSignup from './useSignup';

const radioItems = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
  { value: 'other', label: 'other' },
];
//Your tastebuds called. We answered.
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const { signup, isSigning } = useSignup();

  function handleGender(value) {
    setGender(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;

    if (name.length < 5) {
      toast.error('Name should contain 5 or more characters');
      return;
    }

    if (phone.length !== 10) {
      toast.error('Incorrect phone number');
      return;
    }

    if (password.length < 8) {
      toast.error('Password should have 8 or more characters');
      return;
    }

    console.log({
      name,
      email,
      phone,
      password,
      dob,
      gender,
    });

    signup({ name, email, phoneNumber: phone, password, dob, gender });
  }

  return (
    <div className="relative flex items-center justify-center sm:py-10 w-full h-screen bg-[radial-gradient(circle_farthest-corner_at_top_left,rgb(255,142,62)_10%,rgb(255,178,62)_20%,rgb(255,83,45)_60%,rgb(255,136,44)_70%,rgb(255,145,62)_80%,rgb(255,182,125)_90%)]">
      <div className="relative w-full sm:max-w-[550px] md:max-w-[600px] lg:max-w-[900px] xl:max-w-[1250px] custom-laptop-lg-max-width custom-laptop-xl-max-width h-full flex justify-between items-center gap-5">
        <div className="relative w-full h-full max-h-[1200px] max-w-[900px] bg-gray-50 lg:flex-1/2 rounded-xl shadow-[1px_2px_5px_3px] shadow-rose-500 border border-rose-600 flex flex-col justify-start gap-2 xl:gap-5 p-2 sm:p-5">
          <div className="flex items-center justify-start w-full gap-10 pl-5 text-lg custom-mobile-text-size custom-laptop-text-size">
            <Link
              to="/"
              className="relative font-semibold text-blue-400 after:absolute after:left-0 after:top-full after:w-full after:h-[2px] after:bg-orange-500 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="relative font-semibold text-blue-400 after:absolute after:left-0 after:top-full after:w-full after:h-[2px] after:bg-orange-500 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out"
            >
              Login
            </Link>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="z-20 flex flex-col items-start justify-start w-full gap-2 px-5 overflow-auto sm:gap-3 xl:gap-4 sm:px-5 sm:pb-5 xl:px-15 custom-laptop-padding-y custom-laptop-gap grow-1 "
          >
            <div className="flex flex-col-reverse items-start justify-center w-full gap-1 focus:shadow-2xl focus:shadow-gray-500">
              <input
                type="text"
                className="peer w-full py-1 px-3 bg-gray-200 text-lg custom-mobile-text-size custom-mobile-placeholder-size  tracking-wider text-gray-600 focus:outline-none placeholder:text-[1rem] 2xl:placeholder:text-[1.2rem] placeholder:text-gray-400 border-b-2 border-b-transparent focus:border-b-green-500 focus:invalid:border-b-red-500"
                id="name"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label
                htmlFor="name"
                className="px-3 py-1 text-sm font-semibold tracking-wide text-gray-500 transition-all ease-linear duration-400 peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-5"
              >
                Full name
              </label>
            </div>
            <div className="flex flex-col-reverse items-start justify-center w-full gap-1 focus:shadow-2xl focus:shadow-gray-500">
              <input
                type="email"
                className="peer custom-mobile-text-size custom-mobile-placeholder-size w-full py-1 px-3 bg-gray-200 text-lg tracking-wider text-gray-600 focus:outline-none placeholder:text-[1rem] 2xl:placeholder:text-[1.2rem] placeholder:text-gray-400 border-b-2 border-b-transparent focus:border-b-green-500 focus:invalid:border-b-red-500"
                id="email"
                placeholder="your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className="px-3 py-1 text-sm font-semibold tracking-wide text-gray-500 transition-all ease-linear duration-400 peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-5"
              >
                Email address
              </label>
            </div>
            <div className="flex flex-col-reverse items-start justify-center w-full gap-1 focus:shadow-2xl focus:shadow-gray-500">
              <input
                type="number"
                className="peer custom-mobile-text-size  custom-mobile-placeholder-size w-full py-1 px-3 bg-gray-200 text-lg  tracking-wider text-gray-600 focus:outline-none placeholder:text-[1rem] 2xl:placeholder:text-[1.2rem] placeholder:text-gray-400 border-b-2 border-b-transparent focus:border-b-green-500 focus:invalid:border-b-red-500"
                id="phone"
                placeholder="your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label
                htmlFor="phone"
                className="px-3 py-1 text-sm font-semibold tracking-wide text-gray-500 transition-all ease-linear duration-400 peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-5"
              >
                Phone number
              </label>
            </div>
            <div className="flex flex-col items-start justify-center gap-6 sm:flex-row">
              {radioItems.map((item) => (
                <div key={item.value}>
                  <RadioGroup
                    name="gender"
                    item={item}
                    value={gender}
                    handleChange={handleGender}
                    defaultChecked="male"
                    mediaClass=" custom-mobile-text-size text-lg "
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-1">
              <label
                htmlFor="dob"
                className="text-lg tracking-wide custom-mobile-text-size"
              >
                Date of birth{' '}
                <span className="font-mono text-sm font-semibold">
                  (Optional) (MM/DD/YYYY)
                </span>
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full custom-mobile-text-size border-1 text-lg border-gray-300 px-3 py-1 rounded-[10px] bg-gray-100 text-gray-500 tracking-wider"
              />
            </div>
            <div className="flex flex-col-reverse items-start justify-center w-full gap-1 focus:shadow-2xl focus:shadow-gray-500">
              <input
                type="password"
                className="peer custom-mobile-text-size custom-mobile-placeholder-size w-full py-1 px-3  bg-gray-200 text-lg  tracking-wider text-gray-600 focus:outline-none placeholder:text-[1rem] 2xl:placeholder:text-[1.2rem] placeholder:text-gray-400 border-b-2 border-b-transparent focus:border-b-green-500 focus:invalid:border-b-red-500"
                id="password"
                placeholder="password should be more than 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className="px-3 py-1 text-sm font-semibold tracking-wide text-gray-500 transition-all ease-linear duration-400 peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-5"
              >
                Password
              </label>
            </div>

            <button className="mt-5 sm:mt-0 flex items-center justify-center w-[70%] mx-auto rounded-4xl text-gray-50 font-semibold tracking-wider text-lg border border-transparent gap-2 px-6 py-2 xl:py-3 bg-[linear-gradient(110deg,#8c8c8c1f_25%,#99a5b414_75%,#8c8c8c1f_100%),linear-gradient(110deg,#7dadff_5%,#2675fd_20%,#126bfd_50%,#2675fd_80%,#7dadff_100%)] shadow-[0px_5px_5px] shadow-blue-600 hover:-translate-y-0.5 active:translate-y-0 hover:border-blue-800 hover:shadow-[3px_5px_10px_1px] hover:shadow-blue-400 active:shadow-none transition-all duration-300 ease-linear cursor-pointer text-shadow-2xs text-shadow-blue-900">
              <FaBurger />
              <span>Sign Up</span>
            </button>
          </form>
          {/* <div className="absolute top-[73%] left-[-6%] z-10">
            <img
              // src={`${import.meta.env.VITE_BACKEND}public/img/signup/signup-shake.png`}
              src={`${import.meta.env.VITE_BACKEND}public/img/milkshake_icon_2.svg`}
              alt="shake image"
              className="w-40 h-50"
              loading="lazy"
            />
          </div> */}
        </div>
        <div className="relative hidden h-full flex-1/2 lg:block">
          <img
            src={`${import.meta.env.VITE_BACKEND}public/img/signup/signup-burger.png`}
            alt="burger image"
            className="w-full h-full"
            loading="lazy"
          />
          <span className="absolute top-[15%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-300 flex flex-col justify-center items-center gap-10 text-3xl xl:text-5xl text-nowrap font-poetsen text-shadow-2xs text-shadow-gray-700 tracking-wide">
            <span>"Your tastebuds called.</span>
            <span>We answered."</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

//linear-gradient(122deg,rgba(0,0,0,0.7)_60%,rgba(0,0,0,0.8)_70%)
/* <div className="inset-x-0 z-13.5 h-full bg-white rounded-lg shadow-[1px_2px_5px_2px] flex-2/5 shadow-orange-800/90 flex flex-col justify-start items-start">
          <div className="w-full p-5 ">Linkss</div>
          <div className="w-full grow-1">Form</div>
        </div> */

//  <div className="absolute custom-mobile-display-hidden lg:hidden md:top-50 md:left-150 sm:left-110 sm:top-60">
//         <img
//           src={`${import.meta.env.VITE_BACKEND}public/img/signup/signup-burger.png`}
//           alt="burger image"
//           className="w-120 h-125 custom-tab-burger-size"
//           loading="lazy"
//         />
//       </div>
//       <div className="absolute custom-mobile-display-hidden top-40 lg:hidden md:-left-30 sm:-left-35">
//         <img
//           src={`${import.meta.env.VITE_BACKEND}public/img/signup/signup-shake.png`}
//           alt="shake image"
//           className="w-150 h-140"
//           loading="lazy"
//         />
//       </div>
