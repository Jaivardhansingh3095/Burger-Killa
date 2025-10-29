import { formatCurrency } from '../../utils/helpers';
import AddOnProductsList from './AddOnProductsList';
import { RiCloseFill } from 'react-icons/ri';
import { BiCaretUpSquare, BiCheckboxSquare } from 'react-icons/bi';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

function AddOnModalView({ product, onModalClose }) {
  let [checkedAddon, setCheckedAddon] = useState([]);
  let dispatch = useDispatch();
  let tempTotalPrice = useRef();

  function handleCheckedAddon(addon) {
    setCheckedAddon((addons) => {
      const checkAddon = addons.find((item) => item._id === addon._id);

      if (!checkAddon) {
        tempTotalPrice.current =
          checkedAddon.reduce((sum, item) => sum + item.price, 0) + addon.price;
      } else {
        tempTotalPrice.current =
          checkedAddon.reduce((sum, item) => sum + item.price, 0) - addon.price;
      }

      if (!checkAddon) return [...addons, addon];

      return addons.filter((item) => item._id !== addon._id);
    });
  }

  const {
    _id,
    name,
    foodType,
    description,
    imgUrl,
    productImage,
    price,
    categories,
  } = product;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] h-[100%] sm:h-[75%] w-[100%] sm:w-[90%] lg:h-160 lg:w-220 mx-auto  flex flex-col justify-center items-center lg:block"
    >
      <div className="flex justify-end w-full px-3 py-1 bg-white lg:hidden rounded-tl-xl rounded-tr-xl">
        <RiCloseFill
          className="cursor-pointer fill-gray-500 h-7 w-7"
          onClick={onModalClose}
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full h-full overflow-y-auto bg-white lg:flex-row lg:justify-center lg:rounded-xl lg:overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full h-full flex-1/2">
          <div className="flex items-center justify-center w-full lg:block flex-1/2">
            <img
              src={imgUrl}
              alt={productImage}
              loading="lazy"
              className="mt-1 lg:mt-0 w-50 h-50 sm:w-80 sm:h-80 lg:w-full lg:h-full rounded-2xl lg:rounded-none"
            />
          </div>

          <div className="flex flex-col items-start justify-between w-full h-full gap-4 px-6 py-3 flex-1/2">
            <div className="flex items-center justify-start w-full">
              <h2 className="w-full mr-auto text-lg tracking-wider text-gray-600 md:text-xl text-wrap font-poetsen">
                {name}
              </h2>
              {foodType === 'veg' ? (
                <BiCheckboxSquare className="w-8 h-8 fill-teal-700/80" />
              ) : (
                <BiCaretUpSquare className="h-8 w-8 p-[2px] fill-red-700/80" />
              )}
            </div>
            <div>
              <p className="text-[1rem] lg:text-sm text-gray-500 text-wrap">
                {description}
              </p>
            </div>
            <button
              onClick={() => {
                const newObj = {
                  _id,
                  name,
                  price,
                  foodType,
                  categories,
                  addOns: [...checkedAddon],
                  quantity: 1,
                  totalPrice: price + (tempTotalPrice.current || 0),
                };

                dispatch(addItem(newObj));
                onModalClose();
              }}
              className="items-center justify-start hidden w-full px-5 py-2 text-lg font-semibold cursor-pointer text-gray-50 bg-orange-500/85 lg:flex rounded-xl"
            >
              <span className="mr-auto">
                {formatCurrency(price + (tempTotalPrice.current || 0))}
              </span>
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-start w-full h-full gap-2 py-3 lg:py-0 flex-1/2">
          <div className="fixed z-2000 w-105 mx-auto bg-gray-100 px-[5px] py-[2px] hidden lg:flex justify-end">
            <RiCloseFill
              className="cursor-pointer fill-gray-500 h-7 w-7"
              onClick={onModalClose}
            />
          </div>
          <AddOnProductsList
            categories={categories}
            handleCheckedAddon={handleCheckedAddon}
          />
        </div>
      </div>
      <button
        onClick={() => {
          const newObj = {
            _id,
            name,
            price,
            foodType,
            categories,
            addOns: [...checkedAddon],
            quantity: 1,
            totalPrice: price + (tempTotalPrice.current || 0),
          };

          dispatch(addItem(newObj));
          onModalClose();
        }}
        className="flex items-center justify-start w-full px-5 py-3 text-sm font-semibold bg-orange-500 cursor-pointer sm:text-lg sm:px-10 sm:py-4 lg:hidden text-gray-50 rounded-bl-xl rounded-br-xl"
      >
        <span className="mr-auto">
          {formatCurrency(price + (tempTotalPrice.current || 0))}
        </span>
        <span>ADD TO CART</span>
      </button>
    </div>
  );
}

export default AddOnModalView;
