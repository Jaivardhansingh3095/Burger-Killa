import { useState } from 'react';
import RadioGroup from '../../../components/RadioGroup';
import { useAddAddress } from '../useAddAddress';
import { useUpdateAddress } from '../useUpdateAddress';

const radioItems = [
  { value: 'home', label: 'Home' },
  { value: 'work', label: 'Work' },
  { value: 'other', label: 'Other' },
];

function HouseAddressForm({ geoLoc, handleModalClose, editValue, mode }) {
  const [addressType, setAddressType] = useState(() => {
    return editValue?.addressType || '';
  });
  const [flat, setFlat] = useState(() => {
    return editValue?.address?.house?.split(';')?.at(0) || '';
  });
  const [floor, setFloor] = useState(() => {
    return editValue?.address?.house?.split(';')?.at(1) || '';
  });
  const [apartment, setApartment] = useState(() => {
    return editValue?.address?.house?.split(';')?.at(2) || '';
  });
  const [landmark, setLandmark] = useState(() => {
    return editValue?.address?.landmark || '';
  });
  const [isDefault, setIsDefault] = useState(false);
  const { addAddress, isAdding } = useAddAddress();
  const { updateAddress, isUpdating } = useUpdateAddress();

  function handleSubmit(e) {
    e.preventDefault();

    if (!addressType || !flat || !floor || !apartment || !landmark) return;

    const coordinates = [geoLoc.lng, geoLoc.lat];
    const address = {
      house: `${flat};${floor};${apartment}`,
      locality: geoLoc.locality,
      landmark,
    };
    if (mode === 'add')
      addAddress({ coordinates, address, addressType, isDefault });

    if (mode === 'edit') {
      console.log('edit mode');
      console.log({ coordinates, address, addressType, isDefault });
      updateAddress({
        coordinates,
        address,
        addressType,
        isDefault,
        addressId: editValue.addressId,
      });
    }
    setAddressType('');
    setFlat('');
    setFloor('');
    setApartment('');
    setLandmark('');
    handleModalClose();
  }

  function handleType(value) {
    setAddressType(value);
  }

  return (
    <form
      className="w-full flex flex-col items-start gap-7"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="flat-house"
        placeholder="House / Flat no."
        value={flat}
        onChange={(e) => setFlat(e.target.value)}
        className="w-full bg-gray-100 placeholder:text-gray-400 placeholder:text-[.9rem] text-gray-700 p-3 border-b-2 border-b-transparent focus:border-b-2 focus:border-b-orange-400 focus:outline-none transition-all duration-300 ease-in"
        required
        disabled={isAdding || isUpdating}
      />
      <input
        type="text"
        name="wing-floor"
        placeholder="Wing / Floor"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        className="w-full bg-gray-100 placeholder:text-gray-400 placeholder:text-[.9rem] text-gray-700 p-3 border-b-2 border-b-transparent focus:border-b-2 focus:border-b-orange-400 focus:outline-none transition-all duration-300 ease-in"
        required
        disabled={isAdding || isUpdating}
      />
      <input
        type="text"
        name="building-apartment"
        placeholder="Building / Apartment"
        value={apartment}
        onChange={(e) => setApartment(e.target.value)}
        className="w-full bg-gray-100 placeholder:text-gray-400 placeholder:text-[.9rem] text-gray-700 p-3 border-b-2 border-b-transparent focus:border-b-2 focus:border-b-orange-400 focus:outline-none transition-all duration-300 ease-in"
        required
        disabled={isAdding || isUpdating}
      />
      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
        className="w-full bg-gray-100 placeholder:text-gray-400 placeholder:text-[.9rem] text-gray-700 p-3 border-b-2 border-b-transparent focus:border-b-2 focus:border-b-orange-400 focus:outline-none transition-all duration-300 ease-in"
        required
        disabled={isAdding || isUpdating}
      />

      <div className="flex flex-col justify-start gap-2">
        <p className="text-gray-500 text-[.9rem]">Save this address as</p>
        <div className="flex justify-center items-start gap-6">
          {radioItems.map((item) => (
            <div key={item.value}>
              <RadioGroup
                name="type"
                item={item}
                value={addressType}
                handleChange={handleType}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start items-center gap-2">
        <input
          type="checkbox"
          id="default"
          className="accent-orange-400 h-4 w-4"
          value={isDefault}
          onChange={() => setIsDefault(!isDefault)}
          disabled={isAdding || isUpdating}
        />
        <label htmlFor="default" className="text-[.9rem] text-gray-500">
          Is this your default address? (help with fast checkout)
        </label>
      </div>

      <div
        className="w-full flex justify-center items-center"
        disabled={isAdding || isUpdating}
      >
        <button className="bg-orange-400/80 py-5 px-20 rounded-4xl cursor-pointer text-gray-50 font-bold text-[1.1rem] tracking-wide text-shadow-2xs text-shadow-orange-800 focus:outline-none border-1 border-orange-500 hover:bg-orange-500/80 transition-all duration-200 ease-in">
          Save Address
        </button>
      </div>
    </form>
  );
}

export default HouseAddressForm;
