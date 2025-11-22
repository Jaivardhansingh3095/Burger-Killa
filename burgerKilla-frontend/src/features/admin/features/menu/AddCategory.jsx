import { PiPlusBold } from 'react-icons/pi';
import { useAddCategory } from './useAddCategory';
import { useState } from 'react';

function AddCategory({ categories }) {
  const [categoryName, setCategoryName] = useState('');
  const { addCategory, categoryStatus } = useAddCategory();

  return (
    <div className="flex items-center justify-between w-full px-20 py-5">
      <div className="flex items-center justify-center gap-3 text-text-secondary dark:text-text-secondary-dark">
        <span>Total Categories:</span>
        <span className="font-semibold">{categories.length}</span>
      </div>
      <div className="flex items-center justify-center gap-20">
        <div className="flex items-center justify-center gap-5">
          <label
            htmlFor="category"
            className="text-text-secondary dark:text-text-secondary-dark"
          >
            New category:
          </label>
          <input
            type="text"
            id="category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="px-3 py-2.5 bg-gray-200 rounded-lg w-50 focus:outline-none text-text-secondary dark:text-text-primary placeholder:text-text-tertiary"
            placeholder="category name"
          />
        </div>
        <button
          onClick={() => {
            if (!categoryName) return;

            addCategory({ category: categoryName });
            setCategoryName('');
          }}
          disabled={categoryStatus === 'pending'}
          className="flex items-center justify-center gap-2 px-5 py-2 font-bold text-white transition-colors duration-300 ease-linear rounded-lg cursor-pointer bg-primary dark:bg-primary-dark hover:bg-primary/85 hover:dark:bg-primary-dark/85"
        >
          <PiPlusBold className="w-5 h-5" />
          <span className="md:text-lg text-shadow-2xs text-shadow-amber-800">
            Add
          </span>
        </button>
      </div>
    </div>
  );
}

export default AddCategory;
