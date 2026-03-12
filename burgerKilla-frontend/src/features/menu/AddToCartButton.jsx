import { TiPlus } from "react-icons/ti";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

function AddToCartButton({ onModalClose, categories, product }) {
  //const quantity = useSelector((state) => selectQuantityById(state, itemId));
  const dispatch = useDispatch();

  const { _id, name, foodType, price } = product;

  return (
    <button
      onClick={() => {
        if (
          categories === "milkshake" ||
          categories === "refreshment" ||
          categories === "dessert"
        ) {
          const newObj = {
            _id,
            name,
            price,
            foodType,
            categories,
            quantity: 1,
            totalPrice: price,
          };
          console.log({ totalPrice: price });

          dispatch(addItem(newObj));
          return;
        }

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
