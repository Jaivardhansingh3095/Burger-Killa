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
      className="absolute -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] h-150 w-220 mx-auto flex flex-wrap justify-center items-start bg-white rounded-xl overflow-hidden"
    >
      <div className="w-110">
        <img
          src={imgUrl}
          alt={productImage}
          loading="lazy"
          className="h-105 w-full drop-shadow-[1px_3px_15px] drop-shadow-gray-50"
        />
        <div className="py-3 px-6 h-full flex flex-col justify-between items-start gap-4">
          <div className="flex justify-start items-center w-full">
            <h2 className="text-[1.15rem] mr-auto w-full text-wrap text-gray-700 text-shadow-gray-200 text-shadow-[1px_3px_8px]">
              {name}
            </h2>
            {foodType === 'veg' ? (
              <BiCheckboxSquare className="h-8 w-8 fill-teal-700/80" />
            ) : (
              <BiCaretUpSquare className="h-8 w-8 p-[2px] fill-red-700/80" />
            )}
          </div>
          <div>
            <p className="text-[.8rem] text-gray-500 text-wrap">
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
            className="w-full  text-[1.1rem] text-gray-50 bg-orange-500/85 flex justify-start items-center py-2 px-5 rounded-xl cursor-pointer"
          >
            <span className="mr-auto">
              {formatCurrency(price + (tempTotalPrice.current || 0))}
            </span>
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
      <div className="w-110 bg-gray-100 h-full px-3 relative flex flex-col justify-start items-center gap-2">
        <div className="fixed z-2000 w-105 mx-auto bg-gray-100 px-[5px] py-[2px] flex justify-end">
          <RiCloseFill
            className="fill-gray-500 h-7 w-7 cursor-pointer"
            onClick={onModalClose}
          />
        </div>
        <AddOnProductsList
          categories={categories}
          handleCheckedAddon={handleCheckedAddon}
        />
      </div>
    </div>
  );
}

export default AddOnModalView;
