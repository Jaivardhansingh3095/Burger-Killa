import { useNavigate } from 'react-router';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useUpdateUser } from '../useUpdateUser';
import { useSelector } from 'react-redux';
import { selectUser } from '../../authentication/userSlice';
import { camelCaseName, dateValidation } from '../../../utils/helpers';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../../components/Loader';
import RadioGroup from '../../../components/RadioGroup';

const radioItems = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
  { value: 'other', label: 'other' },
];

function Profile() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => selectUser(state));
  const { updateUser, isUpdating } = useUpdateUser();
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  let fullName = useRef('');

  useEffect(
    function () {
      if (!currentUser.user) return;

      fullName.current = camelCaseName(currentUser.user?.name);
      setGender(currentUser.user?.gender);
      setDob(currentUser.user?.dob.split('T').at(0));
    },
    [currentUser?.user],
  );

  if (!currentUser.user) {
    return (
      <div className="max-w-[600px] h-full mx-auto flex justify-center items-center">
        <div className="w-full max-h-[600px]">
          <Loader />
        </div>
      </div>
    );
  }

  function handleGender(value) {
    setGender(value);
  }

  function handleSubmit() {
    if (!dateValidation(dob)) return;
    if (fullName.current.length < 5 || !gender) return;

    updateUser({ name: fullName.current, gender, dob });
  }

  return (
    <>
      {isUpdating && (
        <div className="fixed inset-0 z-1000 max-h-[100vh] w-full bg-gray-600/70 no-doc-scroll flex justify-center items-center">
          <div className="max-w-[400px] max-h-[600px] mx-auto">
            <Loader />
          </div>
        </div>
      )}

      <div className="max-w-[600px] h-full mx-auto p-5">
        <div className="w-full h-full mb-8 px-4 py-2 shadow-[1px_5px_7px_2px] bg-white shadow-gray-300 rounded-[5px]">
          <div className="flex items-center justify-start gap-2 p-3 border-gray-300 border-b-1">
            <button onClick={() => navigate(-1)} className="cursor-pointer">
              <MdOutlineKeyboardBackspace className="w-8 h-8 fill-gray-600" />
            </button>
            <h2 className="text-[1.1rem] tracking-wide text-gray-600">
              Edit Profile
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <h2 className="text-[1.2rem] tracking-wide leading-6 text-gray-600">
              {camelCaseName(currentUser.user.name)}
            </h2>
            <p className="font-sans font-semibold text-gray-400">
              +91 {currentUser.user.phoneNumber}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center gap-10 mt-5 text-gray-600">
            <div className="flex flex-col items-start justify-start w-full gap-2 px-2">
              <label htmlFor="fullname" className="tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                onChange={(e) => (fullName.current = e.target.value)}
                className="w-full h-10 bg-gray-100 font-mono font-semibold text-[1.1rem] border-1 border-gray-300 rounded-[10px] py-1 px-2 focus:text-gray-600"
                defaultValue={camelCaseName(currentUser.user?.name)}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2 px-2">
              <label className="tracking-wide">
                Gender{' '}
                <span className="font-mono font-semibold text-[.9rem]">
                  (Optional)
                </span>
              </label>
              <div className="flex items-start justify-center gap-6">
                {radioItems.map((item) => (
                  <div key={item.value}>
                    <RadioGroup
                      name="gender"
                      item={item}
                      value={gender}
                      handleChange={handleGender}
                      defaultChecked={currentUser.user?.gender}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2 px-2">
              <label htmlFor="dob" className="tracking-wide">
                Date of birth{' '}
                <span className="font-mono font-semibold text-[.9rem]">
                  (Optional) (MM/DD/YYYY)
                </span>
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border-1 border-gray-300 p-2 rounded-[10px] bg-gray-100 text-gray-500 tracking-wider"
              />
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                onClick={handleSubmit}
                className="border-1 border-orange-500 bg-orange-400 py-3 px-5 text-shadow-2xs text-shadow-orange-900 text-white rounded-[10px] tracking-wider focus:outline-none hover:bg-orange-500 transition-all duration-300 ease-linear text-[1.1rem] cursor-pointer"
              >
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
