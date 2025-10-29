import { BiCheckboxSquare } from 'react-icons/bi';
import { BiCaretUpSquare } from 'react-icons/bi';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

function AddOnProduct({
  filterAddOnProducts,
  categoryName,
  handleCheckedAddon,
}) {
  let [checkedBox, setCheckedBox] = useState(() => {
    let obj = {};
    filterAddOnProducts.forEach((item) => {
      obj[item._id] = false;
    });
    return obj;
  });

  return (
    <div className="flex flex-col items-center justify-start w-full gap-5 mt-8 last:mb-10">
      <div className="relative flex items-center justify-center w-full">
        <div className="absolute h-[2px] w-full bg-gray-300 z-1000"></div>
        <h3 className="px-5 text-center text-gray-500 bg-gray-100 z-1050">
          {categoryName}
        </h3>
      </div>
      <ul className="flex flex-col items-center justify-start w-full gap-2">
        {filterAddOnProducts.map((item) => (
          <li
            key={item._id}
            className="w-full rounded-[10px] bg-white font-semibold"
          >
            <label
              className={`rounded-[10px] border-1 border-gray-400 ${checkedBox[item._id] ? 'border-orange-400 text-orange-500' : 'text-gray-700/90'} flex justify-start items-center gap-5 cursor-pointer p-2 sm:px-5 sm:py-4`}
            >
              <span className="flex items-center justify-start gap-2 mr-auto">
                {item.foodType === 'veg' ? (
                  <BiCheckboxSquare className="w-5 h-5 fill-teal-700/80" />
                ) : (
                  <BiCaretUpSquare className="h-5 w-5 p-[2px] fill-red-700/80" />
                )}
                <span className="text-[11px] sm:text-sm tracking-wide ">
                  {item.name}
                </span>
              </span>
              <span className="flex items-center justify-center gap-4">
                <span className="text-[.8rem]">
                  {formatCurrency(item.price)}
                </span>
                <input
                  type="checkbox"
                  name={item._id}
                  onChange={(e) => {
                    const { name, checked } = e.target;
                    setCheckedBox({ ...checkedBox, [name]: checked });
                    handleCheckedAddon({
                      _id: item._id,
                      name: item.name,
                      price: item.price,
                      foodType: item.foodType,
                      categories: item.categories,
                    });
                  }}
                  className="accent-amber-500 h-[1rem] w-[.9rem] checked:outline-none"
                />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddOnProduct;
