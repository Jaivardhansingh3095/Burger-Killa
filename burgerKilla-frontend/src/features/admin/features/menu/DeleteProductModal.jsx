import { ImCancelCircle } from 'react-icons/im';
import { useRemoveProduct } from './useRemoveProduct';

function DeleteProductModal({ product, handleDeleteModal }) {
  const { removeProduct, removeStatus } = useRemoveProduct();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative px-20 bg-white rounded-lg py-15 "
      >
        {/* <div
          className="absolute top-0 cursor-pointer -right-6 sm:-right-12"
          onClick={handleDeleteModal}
        >
          <ImCancelCircle className="w-5 h-5 sm:h-7 sm:w-7 fill-gray-50" />
        </div> */}
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <span className="text-xl font-semibold">
            Would you like to remove the "{product.name}" from the menu?
          </span>
          <div className="flex items-center justify-center gap-20">
            <button
              disabled={removeStatus === 'pending'}
              onClick={() => {
                removeProduct({ productId: product._id });
                handleDeleteModal();
              }}
              className="px-10 py-4 text-lg font-bold text-white rounded-lg bg-green-600/90 shadow-[0px_5px_10px_1px] shadow-green-900 tracking-wider hover:bg-green-600/80 cursor-pointer  active:translate-y-1 active:shadow-none transition-all duration-300 ease-linear"
            >
              Continue
            </button>
            <button
              onClick={handleDeleteModal}
              disabled={removeStatus === 'pending'}
              className="px-10 py-4 text-lg font-bold text-white rounded-lg bg-rose-600/90 shadow-[0px_5px_10px_1px] shadow-rose-900 tracking-wider hover:bg-rose-600/80 cursor-pointer  active:translate-y-1 active:shadow-none transition-all duration-300 ease-linear"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
