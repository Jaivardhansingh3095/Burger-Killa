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
    <div className="mt-8 w-full flex flex-col justify-start items-center gap-5">
      <div className="relative w-full flex justify-center items-center">
        <div className="absolute h-[2px] w-full bg-gray-300 z-1000"></div>
        <h3 className="text-gray-500 text-center z-1020 bg-gray-100 px-5">
          {categoryName}
        </h3>
      </div>
      <ul className="w-full flex flex-col justify-start items-center gap-2">
        {filterAddOnProducts.map((item) => (
          <li key={item._id} className="w-full rounded-[10px] bg-white">
            <label
              className={`rounded-[10px] border-1 border-gray-400 ${checkedBox[item._id] ? 'border-orange-400' : ''} flex justify-start items-center gap-5 cursor-pointer px-5 py-4`}
            >
              <span className="mr-auto flex justify-start items-center gap-2">
                {item.foodType === 'veg' ? (
                  <BiCheckboxSquare className="h-5 w-5 fill-teal-700/80" />
                ) : (
                  <BiCaretUpSquare className="h-5 w-5 p-[2px] fill-red-700/80" />
                )}
                <span className="text-[.9rem] tracking-wide text-gray-700/90">
                  {item.name}
                </span>
              </span>
              <span className="flex justify-center items-center gap-4">
                <span className="text-[.8rem] text-gray-700/80">
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
                  className="accent-amber-500 h-[1rem] w-[.9rem]"
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
