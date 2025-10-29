import { createPortal } from 'react-dom';
import Modal from '../../../components/Modal';
import { useState } from 'react';

import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { useSearchLocation } from '../../map/useSearchLocation';
import DisplayMap from '../../map/DisplayMap';
import ButtonBack from '../../../components/ButtonBack';
import HouseAddressForm from './HouseAddressForm';

function AddAddress({
  openModal,
  handleModalClose,
  user,
  defaultPage = 1,
  editValue = {},
  mode = 'add',
}) {
  const [page, setPage] = useState(defaultPage);
  const [geoLoc, setGeoLoc] = useState(() => {
    return {
      lat:
        editValue?.coordinates?.at(1) ||
        user?.locations?.at(0)?.coordinates?.at(1) ||
        26.9476,
      lng:
        editValue?.coordinates?.at(0) ||
        user?.locations?.at(0)?.coordinates?.at(0) ||
        75.7217,
      locality:
        editValue?.address?.locality ||
        user?.locations?.at(0)?.address?.locality ||
        'Rawan Gate / Kalwar Road, Harnathapura, Gokulpura, Jaipur, Rajasthan, 302012, India',
    };
  });
  const { loading, keyword, setKeyword, suggestion, error } =
    useSearchLocation();

  function handleGeoLocation(loc) {
    setGeoLoc((prev) => {
      return { ...prev, ...loc };
    });
  }

  return createPortal(
    <Modal open={openModal} onModalClose={handleModalClose}>
      <div
        className="absolute top-0 left-0 h-full w-full md:w-[80%] xl:w-[600px] 2xl:w-[1000px] bg-[linear-gradient(86deg,#ffffe7f3_100%,#eeeed2ef_51%,#f8f8b5_0%)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/*First page*/}
        {page === 1 ? (
          <div className="flex flex-col items-start justify-start w-full h-full px-2 sm:px-5 md:px-10">
            {/* Back button and Search bar */}
            <div className="flex items-center justify-start w-full gap-2 py-2 sm:gap-5 md:gap-10 xl:py-5">
              <button
                onClick={() => {
                  if (page === 1) {
                    handleModalClose();
                  } else {
                    setPage(2);
                  }
                }}
                className="cursor-pointer focus:outline-orange-400"
              >
                <MdOutlineKeyboardArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 fill-orange-400" />
              </button>
              <div className="w-full relative border-1 border-gray-100 flex items-center gap-2 bg-gray-50 px-3 py-1 shadow-[1px_1px_8px_3px] shadow-gray-200 rounded-md focus-within:border-orange-400">
                <IoIosSearch className="w-6 h-6 fill-orange-400" />
                <input
                  type="search"
                  className="peer grow-1 placeholder:text-[.8rem] placeholder:text-gray-400 px-2 py-2 focus:outline-none text-gray-600 border-none"
                  placeholder="Search for area, landmark, house"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
                <div className="absolute z-1500 left-0 w-full top-12.5 max-h-[600px]  bg-gray-50 rounded-[5px] hidden opacity-0 peer-focus:opacity-100 peer-focus:block">
                  <div className="flex flex-col items-start w-full h-full gap-0 px-3 py-3">
                    <div
                      role="button"
                      className="flex items-center justify-start w-full gap-3 p-3 text-orange-400 transition-all duration-200 ease-linear border-b cursor-pointer border-b-gray-200 hover:text-orange-600"
                    >
                      <FiMapPin className="w-10 h-10 text-orange-300" />
                      <div className="flex flex-col justify-start">
                        <span className="text-[.9rem] font-semibold">
                          Current location
                        </span>
                        <span className="text-[.8rem] text-gray-600">
                          using gps
                        </span>
                      </div>
                    </div>

                    {/* Search results list */}
                    {suggestion.length !== 0 || loading || error ? (
                      <div className="w-full h-100 flex flex-col justify-start items-start text-[.9rem] overflow-y-auto">
                        <span className="p-3 tracking-wide text-gray-600 font-poetsen">
                          Search Results for "{keyword}"
                        </span>
                        {loading && <p>Loading suggestions...</p>}
                        {error && (
                          <p>
                            No results found, please enter nearby landmark &
                            drop the pin on map
                          </p>
                        )}
                        {suggestion.length ? (
                          <ul className="flex flex-col items-start justify-start w-full">
                            {suggestion.map((predict, i) => (
                              <li
                                key={i}
                                className="w-full h-auto p-3 transition duration-100 ease-linear cursor-pointer not-last:border-b not-last:border-b-gray-200 hover:text-gray-600"
                                onMouseDown={(e) => {
                                  console.log(e.target.name, e.target.value);
                                  const lat = predict.geometry.location.lat;
                                  const lng = predict.geometry.location.lng;
                                  const locality = predict.description;
                                  handleGeoLocation({ lat, lng, locality });
                                }}
                              >
                                <p className="font-semibold tracking-wide">
                                  {predict.structured_formatting?.main_text}
                                </p>
                                <p className="text-[.85rem] mt-[5px]">
                                  {
                                    predict.structured_formatting
                                      ?.secondary_text
                                  }
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/*Displaying Map*/}
            <DisplayMap geoLoc={geoLoc} />

            {/*Display marker address*/}
            <div className="py-2 xl:py-5">
              <p className="text-xs font-semibold sm:text-sm">
                Building or Locality
              </p>
              <p className="text-[10px] sm:text-xs">{geoLoc.locality}</p>
            </div>

            <div className="flex items-center justify-center w-full">
              <button
                onClick={() => setPage(2)}
                className="w-[75%] sm:w-[50%] bg-orange-400/80 text-gray-50 py-1.5 sm:py-2.5 xl:py-4 rounded-4xl font-semibold sm:text-lg text-shadow-2xs text-shadow-orange-800 shadow-[1px_1px_1px_1px] shadow-orange-800 cursor-pointer hover:bg-orange-500/80 transition-all dura ease-linear"
              >
                Confirm Location
              </button>
            </div>
          </div>
        ) : null}

        {/*Second page*/}
        {page === 2 ? (
          <div className="flex flex-col items-start justify-start w-full h-full px-2 sm:px-10">
            {/*Back button and locality address*/}
            <div className="flex flex-col justify-start w-full py-2 sm:py-5">
              <div className="flex items-center justify-start gap-5">
                <ButtonBack
                  handler={handleModalClose}
                  value={page}
                  updater={setPage}
                />
                <div>
                  <p className="text-sm sm:text-[1rem] font-semibold">
                    Building or Locality
                  </p>
                  <p className="text-xs sm:text-sm">{geoLoc.locality}</p>
                </div>
              </div>
            </div>

            {/*Form to add house no , flat and landmark*/}
            <div className="w-full p-2 bg-white sm:p-5">
              <HouseAddressForm
                geoLoc={geoLoc}
                handleModalClose={handleModalClose}
                editValue={editValue}
                mode={mode}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Modal>,
    document.body,
  );
}

export default AddAddress;
