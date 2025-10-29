import { MdDinnerDining } from 'react-icons/md';
import { FaBasketShopping } from 'react-icons/fa6';
import useOutsideClick from '../../hook/useOutsideCllick';
import Modal from '../../components/Modal';
import MenuModalView from './MenuModalView';
import CartModalView from '../cart/CartModalView';

function MediumMenuCartView() {
  const { openModal, handleModalClose } = useOutsideClick();
  const { openModal: openModalCart, handleModalClose: handleModalCloseCart } =
    useOutsideClick();

  return (
    <div className="fixed bottom-0 z-10 flex items-center justify-center w-full sm:gap-5 sm:px-10 lg:hidden">
      <button
        onClick={handleModalClose}
        className="flex items-center justify-center w-full gap-3 py-4 text-lg text-white bg-blue-500 cursor-pointer sm:text-2xl sm:py-4 rounded-xl"
      >
        <MdDinnerDining className="w-6 h-6 sm:w-8 sm:h-8" />
        <span>Menu</span>
      </button>
      <button
        onClick={handleModalCloseCart}
        className="flex items-center justify-center w-full gap-3 py-4 text-lg text-white bg-orange-500 cursor-pointer sm:text-2xl sm:py-4 rounded-xl"
      >
        <FaBasketShopping className="w-6 h-6 sm:w-8 sm:h-8" />
        <span>Cart</span>
      </button>

      {openModal ? (
        <Modal open={openModal} onModalClose={handleModalClose}>
          <MenuModalView handleModalClose={handleModalClose} />
        </Modal>
      ) : null}
      {openModalCart ? (
        <Modal open={openModalCart} onModalClose={handleModalCloseCart}>
          <CartModalView handleModalClose={handleModalCloseCart} />
        </Modal>
      ) : null}
    </div>
  );
}

export default MediumMenuCartView;
