import { MdLunchDining } from "react-icons/md";
import useOutsideClick from "../../hook/useOutsideCllick";
import Modal from "../../components/Modal";
import MenuModalView from "./MenuModalView";

function MenuFloatingButton() {
  const { openModal: menuModal, handleModalClose: handleMenuModalClose } =
    useOutsideClick();
  return (
    <div className="lg:hidden fixed z-10 bottom-[12%] left-[50%] -translate-x-[50%]">
      <div
        role="button"
        onClick={handleMenuModalClose}
        className="relative flex items-center justify-center gap-2 px-5 pt-2 pb-1 shadow-[0px_2px_4px_1px] shadow-gray-500 text-white bg-gray-900 rounded-tl-full rounded-tr-full"
      >
        <span className="absolute -top-3 left-[50%] -translate-x-[50%] rounded-tl-3xl rounded-tr-3xl py-1.5 px-3 bg-gray-900" />
        <MdLunchDining className="w-5 h-5" />
        <span className="tracking-wide text-shadow-2xs text-shadow-gray-300">
          Menu
        </span>
      </div>
      {menuModal ? (
        <Modal open={menuModal} onModalClose={handleMenuModalClose}>
          <MenuModalView handleModalClose={handleMenuModalClose} />
        </Modal>
      ) : null}
    </div>
  );
}

export default MenuFloatingButton;
