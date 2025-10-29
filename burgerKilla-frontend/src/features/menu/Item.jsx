import { FaRegCaretSquareUp } from 'react-icons/fa';
import AddToCartButton from './AddToCartButton';
import { formatCurrency } from '../../utils/helpers';

import Modal from '../../components/Modal';
import AddOnModalView from './AddOnModalView';
import { BiCaretUpSquare, BiCheckboxSquare } from 'react-icons/bi';
import useOutsideClick from '../../hook/useOutsideCllick';

//bg-[linear-gradient(86deg,#ffffe7f3_100%,#eeeed2ef_51%,#f8f8b5_0%)]
//bg-[linear-gradient(44deg,#fffebc_0%,#fff7b8_40%,#ffe1aa_80%)]

function Item({ product }) {
  const { openModal, handleModalClose } = useOutsideClick();

  const {
    _id,
    name,
    price,
    description,
    foodType,
    productImageSmall,
    imgUrlSmall,
    categories,
  } = product;

  return (
    <div className="relative flex items-start justify-center w-full gap-2 p-2 border-gray-300 rounded-md border-1">
      <div className="flex flex-col items-start justify-between h-full gap-2 flex-3/5">
        <div className="flex flex-col items-start justify-start gap-1">
          {foodType === 'veg' ? (
            <BiCheckboxSquare className="w-6 h-6 fill-teal-700/80" />
          ) : (
            <BiCaretUpSquare className="h-6 w-6 p-[2px] fill-red-700/80" />
          )}
          <h2 className="text-sm md:text-[1rem] lg:text-lg font-bold tracking-wider text-wrap text-amber-500 text-shadow-orange-700 text-shadow-2xs">
            {name}
          </h2>
          <p className="text-sm md:text-[1rem] lg:text-lg text-gray-700 font-[900]">
            {formatCurrency(price)}
          </p>
          <p className=" text-[9px] lg:text-xs text-gray-600 text-wrap">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-start">
          <AddToCartButton
            onModalClose={handleModalClose}
            categories={categories}
          />
        </div>
      </div>
      <div className="overflow-hidden border-gray-800 rounded-2xl border-1 ">
        <img
          src={imgUrlSmall}
          alt={productImageSmall}
          loading="lazy"
          className="h-45 w-45 lg:h-50 lg:w-55 xl:h-45 xl:w-45 2xl:h-55 2xl:w-60"
        />
      </div>

      {openModal ? (
        <Modal open={openModal} onModalClose={handleModalClose}>
          <AddOnModalView product={product} onModalClose={handleModalClose} />
        </Modal>
      ) : null}
    </div>
  );
}

export default Item;
