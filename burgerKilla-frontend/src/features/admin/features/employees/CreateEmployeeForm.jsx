import { IoArrowBackOutline } from 'react-icons/io5';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import { useNavigate } from 'react-router';
import { useState } from 'react';
import RadioGroup from '../../../../components/RadioGroup';
import {
  camelCaseName,
  emailPattern,
  GENDERTYPE,
  phonePattern,
} from '../../../../utils/helpers';
import { useCreateEmployee } from './useCreateEmployee';

const ROLES = ['staff', 'delivery', 'manager'];

function CreateEmployeeForm() {
  const navigate = useNavigate();
  const [page, setPage] = useState('page1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('staff');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const { createEmployee, creatingStatus } = useCreateEmployee();

  if (creatingStatus === 'pending') {
    return (
      <div className="h-full px-1 py-2 bg-white border-2 rounded-lg border-accent dark:border-accent-dark flex-1/2 inset-shadow-[1px_-1px_3px_1px] inset-shadow-accent dark:inset-shadow-accent-dark">
        <div className="flex flex-col items-center justify-center w-full h-full gap-10 pt-10 pb-5 px-15">
          <div className="mx-auto text-gray-300 border-4 rounded-full w-25 h-25 border-t-primary dark:border-t-primary-dark animate-spin" />
          <span className="text-xl font-semibold text-gray-500">
            Please wait...
          </span>
        </div>
      </div>
    );
  }

  if (creatingStatus === 'success') {
    return (
      <div className="h-full px-1 py-2 bg-white border-2 rounded-lg border-accent dark:border-accent-dark flex-1/2 inset-shadow-[1px_-1px_3px_1px] inset-shadow-accent dark:inset-shadow-accent-dark">
        <div className="flex flex-col items-center justify-start w-full h-full gap-20 pt-10 pb-5 px-15">
          <div className="flex flex-col items-center justify-center gap-5">
            <RiCheckboxCircleLine className="w-45 h-45 fill-green-600/85" />
            <span className="text-xl font-semibold text-green-600/85">
              Account Created Successfully
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <span className="text-lg font-semibold tracking-wide text-gray-600">
              Create a new employee account
            </span>
            <div className="flex items-center justify-center gap-15">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-3 text-lg font-bold tracking-wider text-blue-500 rounded-lg cursor-pointer ring-2 ring-blue-500"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate(0)}
                className="px-8 py-3 text-lg font-bold tracking-wider text-white rounded-lg ring-2 ring-primary dark:ring-primary-dark bg-primary dark:bg-primary-dark shadow-[1px_4px_5px_1px] shadow-gray-400 cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function handleGender(value) {
    setGender(value);
  }

  function handleContinue() {
    //Handling form error
    let errorFound = false;
    const errorObj = {
      name: false,
      email: false,
      phone: false,
    };
    //checking error in each field
    if (
      !name ||
      name.trim().length <= 5 ||
      name.trim().split(' ').length <= 1
    ) {
      errorObj.name = true;
      errorFound = true;
    }

    if (!email || !emailPattern.test(email.trim())) {
      errorObj.email = true;
      errorFound = true;
    }

    if (!phone || !phonePattern.test(phone.trim())) {
      errorObj.phone = true;
      errorFound = true;
    }

    if (!dob) {
      errorFound = true;
    }

    if (errorFound) {
      setError((prev) => {
        const newObj = { ...prev };
        Object.keys(errorObj).forEach((key) => (newObj[key] = errorObj[key]));

        return { ...newObj };
      });
      return;
    }

    setError((prev) => ({ ...prev, name: false, email: false, phone: false }));
    setPage('page2');
  }

  function handleCreate() {
    //Handling form error
    let errorFound = false;
    const errorObj = {
      password: false,
      passwordConfirm: false,
    };

    if (!password || password.length < 8) {
      errorObj.password = true;
      errorFound = true;
    }

    if (!passwordConfirm || password !== passwordConfirm) {
      errorObj.passwordConfirm = true;
      errorFound = true;
    }

    if (errorFound) {
      setError((prev) => {
        const newObj = { ...prev };
        Object.keys(errorObj).forEach((key) => (newObj[key] = errorObj[key]));

        return { ...newObj };
      });
      return;
    }

    createEmployee({
      name,
      email,
      phoneNumber: phone,
      password,
      gender,
      dob,
      role,
    });
  }

  return (
    <div className="h-full px-1 py-2 bg-white rounded-lg flex-1/2 shadow-[1px_1px_1px_1px_#ffa1138f,-1px_-1px_1px_1px_#ffa1138e] ">
      <div className="w-full h-full pt-10 pb-5 px-15">
        <ul className="flex flex-col items-center justify-start w-full h-full gap-8">
          {page === 'page1' ? (
            <>
              <li className="flex items-start justify-between w-full gap-12">
                <label
                  htmlFor="name"
                  className="text-lg font-semibold text-gray-500"
                >
                  Name:
                </label>
                <div className="flex flex-col items-center justify-center grow-1">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 font-semibold tracking-wider text-gray-600 bg-gray-200 rounded-lg focus:outline-none"
                  />
                  {error.name ? (
                    <span className="w-[95%] pl-2 py-[2px] text-xs text-gray-600 bg-rose-200">
                      Full name is required.
                    </span>
                  ) : (
                    <span className="w-full py-[10px] bg-white"></span>
                  )}
                </div>
              </li>
              <li className="flex items-start justify-between w-full gap-13">
                <label
                  htmlFor="email"
                  className="text-lg font-semibold text-gray-500"
                >
                  Email:
                </label>
                <div className="flex flex-col items-center justify-center grow-1">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 font-semibold tracking-wider text-gray-600 bg-gray-200 rounded-lg focus:outline-none"
                  />
                  {error.email ? (
                    <span className="w-[95%] pl-2 py-[2px] text-xs text-gray-600 bg-rose-200">
                      Email is required and should be unique.
                    </span>
                  ) : (
                    <span className="w-full py-[10px] bg-white"></span>
                  )}
                </div>
              </li>
              <li className="flex items-start justify-between w-full gap-11">
                <label
                  htmlFor="phone"
                  className="text-lg font-semibold text-gray-500"
                >
                  Phone:
                </label>
                <div className="flex flex-col items-center justify-center grow-1">
                  <input
                    id="phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-2 font-semibold tracking-wider text-gray-600 bg-gray-200 rounded-lg focus:outline-none"
                  />
                  {error.phone ? (
                    <span className="w-[95%] pl-2 py-[2px] text-xs text-gray-600 bg-rose-200">
                      Phone number is required.
                    </span>
                  ) : (
                    <span className="w-full py-[10px] bg-white"></span>
                  )}
                </div>
              </li>
              <li className="flex items-start justify-start w-full gap-9">
                <label
                  htmlFor=""
                  className="text-lg font-semibold text-gray-500"
                >
                  Gender:
                </label>
                <div className="flex items-center justify-center gap-6">
                  {GENDERTYPE.map((item) => (
                    <div key={item.value}>
                      <RadioGroup
                        name="gender"
                        item={item}
                        value={gender}
                        handleChange={handleGender}
                        defaultChecked="male"
                      />
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-start justify-start w-full gap-15">
                <label
                  htmlFor="dob"
                  className="text-lg font-semibold text-gray-500"
                >
                  DOB:
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full border-1 border-gray-300 p-1.5 rounded-[10px] bg-gray-100 text-gray-500 tracking-wider"
                />
              </li>
              <li className="flex items-center justify-center w-full grow-1">
                <button
                  onClick={handleContinue}
                  className="px-10 py-3 text-2xl font-bold tracking-wider text-white rounded-lg cursor-pointer bg-primary dark:bg-primary-dark text-shadow-2xs text-shadow-amber-900 dark:text-shadow-blue-900 hover:bg-primary/90 shadow-[0px_1px_3px_1px] shadow-amber-700 dark:shadow-blue-700 transition-all duration-300 ease-linear"
                >
                  Continue
                </button>
              </li>
            </>
          ) : null}
          {page === 'page2' ? (
            <>
              <li className="relative flex items-center justify-start w-full">
                <div
                  role="button"
                  onClick={() => setPage('page1')}
                  className="absolute flex items-center justify-center gap-3 cursor-pointer -left-5 -top-5 text-primary dark:text-primary-dark"
                >
                  <IoArrowBackOutline className="w-6 h-6" />
                  <span className="text-xl font-semibold">Back</span>
                </div>
              </li>
              <li className="flex items-start justify-start w-full gap-12">
                <label
                  htmlFor="role"
                  className="text-lg font-semibold text-gray-500"
                >
                  Role:
                </label>
                <select
                  id="role"
                  name="category"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="px-10 font-semibold text-gray-600 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  //disabled={updateStatus === 'pending'}
                >
                  {ROLES.map((val) => (
                    <option className="" value={val}>
                      {camelCaseName(val)}
                    </option>
                  ))}
                </select>
              </li>
              <li className="flex items-start justify-between w-full gap-12">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold text-gray-500"
                >
                  Password:
                </label>
                <div className="flex flex-col items-center justify-center grow-1">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 font-semibold tracking-wider text-gray-600 bg-gray-200 rounded-lg focus:outline-none"
                  />
                  {error.password ? (
                    <span className="w-[95%] pl-2 py-[2px] text-xs text-gray-600 bg-rose-200">
                      Password should be more than 8 characters.
                    </span>
                  ) : (
                    <span className="w-full py-[10px] bg-white"></span>
                  )}
                </div>
              </li>
              <li className="flex items-start justify-between w-full gap-12">
                <label
                  htmlFor="passwordConfirm"
                  className="h-full w-[17%] text-lg font-semibold text-gray-500  text-wrap"
                >
                  Password Confirm:
                </label>
                <div className="flex flex-col items-center justify-center grow-1">
                  <input
                    id="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    className="w-full p-2 font-semibold tracking-wider text-gray-600 bg-gray-200 rounded-lg focus:outline-none"
                  />
                  {error.passwordConfirm ? (
                    <span className="w-[95%] pl-2 py-[2px] text-xs text-gray-600 bg-rose-200">
                      Password do not match.
                    </span>
                  ) : (
                    <span className="w-full py-[10px] bg-white"></span>
                  )}
                </div>
              </li>
              <li className="flex items-center justify-center w-full grow-1">
                <button
                  onClick={handleCreate}
                  className="px-13 py-5 text-2xl font-bold tracking-wider text-white rounded-lg cursor-pointer bg-primary dark:bg-primary-dark text-shadow-2xs text-shadow-amber-900 dark:text-shadow-blue-900 hover:bg-primary/90 shadow-[0px_1px_3px_1px] shadow-amber-700 dark:shadow-blue-700 transition-all duration-300 ease-linear"
                >
                  Create Account
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default CreateEmployeeForm;
