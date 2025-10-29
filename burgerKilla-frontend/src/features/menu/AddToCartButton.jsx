import { TiPlus } from 'react-icons/ti';
import { LiaCartPlusSolid } from 'react-icons/lia';

function AddToCartButton({ onModalClose, categories }) {
  //const quantity = useSelector((state) => selectQuantityById(state, itemId));

  return (
    <button
      onClick={() => {
        if (
          categories === 'milkshake' ||
          categories === 'refreshment' ||
          categories === 'dessert'
        )
          return;

        onModalClose();
      }}
      className="px-6 py-1.5 shadow-[1px_2px_5px_1px] shadow-gray-500 bg-gray-200  rounded-lg flex justify-center items-center gap-2 cursor-pointer text-gray-600 hover:text-white hover:bg-orange-400 transition-all duration-150 ease-linear"
    >
      {/* Add
      <TiPlus className="ml-1" /> */}
      <LiaCartPlusSolid className="w-6 h-6 lg:w-8 lg:h-8" />
    </button>
  );
}

export default AddToCartButton;
