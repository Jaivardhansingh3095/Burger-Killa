import Modal from "../components/Modal";
import Cart from "../features/cart/Cart";
import CartModalView from "../features/cart/CartModalView";
import BottomTraverselMenu from "../features/menu/BottomTraverselMenu";
import MenuFloatingButton from "../features/menu/MenuFloatingButton";

import MenuLayout from "../features/menu/MenuLayout";
import MenuModalView from "../features/menu/MenuModalView";
import useOutsideClick from "../hook/useOutsideCllick";

function Menu() {
  const { openModal: menuModal, handleModalClose: handleMenuModalClose } =
    useOutsideClick();
  return (
    <div className="p-2 z-1 h-auto lg:h-[89vh] max-w-[2100px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-2 bg-gray-100">
      <MenuLayout />
      <Cart />
      <MenuFloatingButton handleMenuModalClose={handleMenuModalClose} />
      <BottomTraverselMenu />

      {menuModal ? (
        <Modal open={menuModal} onModalClose={handleMenuModalClose}>
          <MenuModalView handleModalClose={handleMenuModalClose} />
        </Modal>
      ) : null}
    </div>
  );
}

export default Menu;
