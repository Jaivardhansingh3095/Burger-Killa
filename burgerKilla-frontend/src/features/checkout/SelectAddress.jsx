import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineWork } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import { LuPenLine } from 'react-icons/lu';

import { Link } from 'react-router';
import useOutsideClick from '../../hook/useOutsideCllick';
import { useState } from 'react';
import AddAddress from '../account/components/AddAddress';

// ${address === loc.addressId ? 'bg-orange-400 border border-orange-400 text-gray-50' : loc.isDefault ? 'bg-orange-400 border border-orange-400 text-gray-50' : ' border border-gray-300 text-gray-600'}

function SelectAddress({ user, address, handleAddress }) {
  const { openModal, handleModalClose } = useOutsideClick();
  const [mode, setMode] = useState({
    mode: 'add',
    value: {},
  });

  return (
    <>
      <div className="w-full h-auto bg-white px-3 rounded-2xl shadow-[1px_1px_2px_1px] shadow-gray-200 flex flex-col justify-start items-start">
        <div className="flex justify-start w-full py-2 border-b border-b-gray-200">
          <Link
            className="flex items-center justify-center cursor-pointer"
            to={'/menu'}
            role="button"
          >
            <MdOutlineKeyboardArrowLeft className="h-7 w-7 sm:h-10 sm:w-10 fill-orange-500" />
            <span className="text-xs tracking-wide text-orange-500 sm:text-sm">
              Back to Menu
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-start w-full gap-3 py-3 overflow-x-scroll sm:py-6 ">
          <div
            role="button"
            onClick={() => {
              setMode((prev) => {
                return {
                  ...prev,
                  mode: 'add',
                  value: {},
                };
              });
              handleModalClose();
            }}
            className="flex flex-col items-center justify-center gap-1 p-3 text-gray-700 transition-all duration-200 ease-in border border-gray-400 border-dashed cursor-pointer sm:p-8 hover:text-orange-700 rounded-2xl"
          >
            <div>
              <FaLocationDot className="w-6 h-6" />
            </div>
            <span className="font-sans text-xs font-semibold sm:text-sm text-nowrap">
              + Add Address
            </span>
          </div>
          <ul className="flex items-center justify-start w-full gap-3 ">
            {user?.locations.map((loc) => (
              <li key={loc.addressId} className="">
                <input
                  type="radio"
                  name="address"
                  id={loc.addressType}
                  className="hidden peer"
                  value={address}
                  onChange={() => handleAddress(loc.addressId)}
                  defaultChecked={loc.isDefault}
                />
                <label
                  htmlFor={loc.addressType}
                  className={`hover:border-orange-400  cursor-pointer flex flex-col justify-start items-start gap-2 sm:gap-5 p-2 sm:p-5 rounded-2xl border border-gray-300 text-gray-600 peer-checked:bg-orange-400 peer-checked:border-orange-400 peer-checked:text-gray-50 `}
                >
                  <div className="flex items-center justify-start w-full">
                    <div className="flex items-center justify-center gap-1 p-1 mr-auto border border-orange-400 rounded-xl bg-amber-50 ">
                      {loc.addressType === 'home' && (
                        <IoMdHome className="fill-orange-400" />
                      )}
                      {loc.addressType === 'work' && (
                        <MdOutlineWork className="fill-orange-400" />
                      )}
                      {loc.addressType === 'other' && (
                        <FaLocationDot className="fill-orange-400" />
                      )}

                      <span className="font-sans text-xs font-semibold text-orange-400">
                        {loc.addressType === 'home'
                          ? 'Home'
                          : loc.addressType === 'work'
                            ? 'Work'
                            : 'Other'}
                      </span>
                    </div>
                    <div className="p-1 border rounded-4xl bg-amber-50 border-amber-200">
                      <LuPenLine
                        className="w-5 h-5 text-orange-400"
                        onClick={() => {
                          setMode((prev) => {
                            return {
                              ...prev,
                              mode: 'edit',
                              value: loc,
                            };
                          });
                          handleModalClose();
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs tracking-wide text-nowrap">
                    {loc.address.house.split(';').join(', ')}...
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {openModal && mode.mode === 'add' && (
        <AddAddress
          openModal={openModal}
          handleModalClose={handleModalClose}
          user={user}
        />
      )}
      {openModal && mode.mode === 'edit' && (
        <AddAddress
          openModal={openModal}
          handleModalClose={handleModalClose}
          user={user}
          editValue={mode.value}
          defaultPage={2}
          mode={'edit'}
        />
      )}
    </>
  );
}

export default SelectAddress;
