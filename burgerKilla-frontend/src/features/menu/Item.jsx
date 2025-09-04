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
    <div className="flex justify-center items-center w-full gap-2 px-3 py-3 rounded-[5px] border-1 border-gray-300 relative">
      <div className="flex-3/5 flex flex-col justify-between gap-2 h-full">
        <div className="flex flex-col justify-start items-start gap-1">
          {foodType === 'veg' ? (
            <BiCheckboxSquare className="h-6 w-6 fill-teal-700/80" />
          ) : (
            <BiCaretUpSquare className="h-6 w-6 p-[2px] fill-red-700/80" />
          )}
          <h2 className="text-wrap text-[1.1rem] text-amber-500 text-shadow-orange-500 text-shadow-2xs">
            {name}
          </h2>
          <p className="text-[1.1rem] text-gray-700 font-[900]">
            {formatCurrency(price)}
          </p>
          <p className="text-[.8rem] text-gray-600 text-wrap">{description}</p>
        </div>
        <div className="flex justify-center items-center">
          <AddToCartButton
            onModalClose={handleModalClose}
            categories={categories}
          />
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border-1 border-gray-800 ">
        <img
          src={imgUrlSmall}
          alt={productImageSmall}
          loading="lazy"
          className="h-50 w-55 "
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
