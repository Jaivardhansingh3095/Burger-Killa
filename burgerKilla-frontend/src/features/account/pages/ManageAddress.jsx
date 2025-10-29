import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { LuPenLine } from 'react-icons/lu';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { selectUser } from '../../authentication/userSlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '../../../components/Loader';
import useOutsideClick from '../../../hook/useOutsideCllick';
import AddAddress from '../components/AddAddress';
import { camelCaseName } from '../../../utils/helpers';
import { useDeleteAddress } from '../useDeleteAddress';

function ManageAddress() {
  const navigate = useNavigate();
  const { openModal, handleModalClose } = useOutsideClick();
  const { user, status } = useSelector((state) => selectUser(state));
  const [mode, setMode] = useState({
    mode: 'add',
    value: {},
  });
  const [openDelete, setOpenDelete] = useState({
    show: false,
    index: '',
  });

  const { deleteAddress, isRemoving } = useDeleteAddress();

  // console.log({ user, status, error });

  useEffect(
    function () {
      if (status !== 'error') return;

      toast('You are logged out! Log in back.', {
        position: 'top-center',
      });
      navigate('/');
    },
    [status],
  );

  if (status === 'pending') {
    return (
      <div className="max-w-[600px] h-full mx-auto flex justify-center items-center">
        <div className="w-full max-h-[600px]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-[100%] sm:w-[90%] md:w-[70%] lg:w-[900px] min-h-[85vh] p-1 sm:p-2 bg-white rounded-[5px] sm:my-4 sm:shadow-[1px_0px_5px_3px] sm:shadow-gray-300/60 flex flex-col justify-start items-start gap-5">
          <div className="flex items-center justify-start w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdOutlineKeyboardBackspace className="w-6 h-6 fill-gray-600" />
              <span className=" sm:text-lg font-semibold text-gray-600 [word-spacing:10px] tracking-wide">
                ADDRESS BOOK
              </span>
            </button>
          </div>
          <div className="h-[2px] w-[90%] mx-auto bg-gray-200" />

          <div className="w-[98%] sm:w-[90%] mx-auto flex flex-col justify-start items-start gap-4">
            <button
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
              className="w-full p-3 font-semibold transition-all duration-200 ease-linear bg-orange-400 border-orange-500 rounded-md cursor-pointer border-1 text-gray-50 sm:text-lg hover:bg-orange-500 hover:text-white"
            >
              + Add Address
            </button>

            {user?.locations?.length === 0 ? (
              <div className="flex items-center justify-center w-full bg-gray-100 h-50 rounded-xl">
                <span>No address saved yet</span>
              </div>
            ) : (
              <ul className="flex flex-col items-start justify-start w-full gap-4 py-5 overflow-y-auto sm:px-2 h-120">
                {user?.locations.map((location) => (
                  <li
                    key={location.addressId}
                    className="w-full p-2 relative flex justify-start items-start gap-2 bg-[linear-gradient(86deg,#ffffe7f3_100%,#eeeed2ef_51%,#f8f8b5_0%)]"
                  >
                    <div>
                      <FiMapPin className="w-8 h-8 text-white fill-orange-400" />
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span className="mr-auto text-gray-600">
                          {camelCaseName(location.addressType)}
                        </span>
                        <div className="flex items-center justify-center gap-6">
                          {location.isDefault && (
                            <span className="font-mono text-[.9rem] px-2 py-.5 rounded-3xl bg-amber-500 text-white">
                              Default
                            </span>
                          )}
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setMode((prev) => {
                                return {
                                  ...prev,
                                  mode: 'edit',
                                  value: location,
                                };
                              });
                              handleModalClose();
                            }}
                          >
                            <LuPenLine className="w-6 h-6 text-orange-400" />
                          </button>
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              setOpenDelete((prev) => {
                                return {
                                  ...prev,
                                  show: true,
                                  index: location.addressId,
                                };
                              })
                            }
                          >
                            <MdDelete className="w-6 h-6 fill-orange-400" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm sm:text-[1rem] flex flex-col items-start justify-start w-full gap-1 font-sans font-semibold text-gray-700">
                        <p className="">
                          {location.address.house.split(';').join(', ')}
                        </p>
                        <p>
                          <span className="font-bold text-gray-900">Near:</span>{' '}
                          {location.address.landmark}
                        </p>
                        <p>{location.address.locality}</p>
                      </div>
                    </div>
                    {openDelete.show &&
                      openDelete.index === location.addressId && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600/70">
                          <div className="bg-white py-2 px-5 rounded-[10px] flex flex-col justify-center items-center gap-4">
                            <span className="text-[.85rem] tracking-wide text-gray-500">
                              Would you like to delete this address?
                            </span>
                            <div className="flex items-center justify-between w-full">
                              <button
                                onClick={() => {
                                  if (!openDelete.index) return;
                                  deleteAddress({
                                    addressId: openDelete.index,
                                  });
                                  setOpenDelete((prev) => {
                                    return {
                                      ...prev,
                                      show: false,
                                      index: '',
                                    };
                                  });
                                }}
                                className="py-1 px-5 bg-[#ff1a1a] text-white rounded-xl border border-[#ff1a1a] text-shadow-2xs text-shadow-orange-900 tracking-wider hover:bg-[#ff3939] transition-all duration-200 ease-in cursor-pointer"
                                disabled={isRemoving}
                              >
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  setOpenDelete((prev) => {
                                    return {
                                      ...prev,
                                      show: false,
                                      index: '',
                                    };
                                  })
                                }
                                className="px-5 py-1 tracking-wider text-green-500 transition-all duration-200 ease-in bg-white border border-green-500 cursor-pointer rounded-xl hover:bg-green-500 hover:text-white"
                                disabled={isRemoving}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </div>
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

export default ManageAddress;
