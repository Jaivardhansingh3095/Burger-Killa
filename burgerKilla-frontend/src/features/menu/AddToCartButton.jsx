import { TiPlus } from 'react-icons/ti';

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
      className="px-6 py-1.5 shadow-[0px_1px_10px_1px] shadow-gray-200 bg-gray-100 border-1 border-gray-500 rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[linear-gradient(86deg,#fefec4f3_100%,#f6f6b9ee_51%,#f7f7a5_0%)] transition-all duration-150 ease-linear"
    >
      Add
      <TiPlus className="ml-1" />
    </button>
  );
}

export default AddToCartButton;
