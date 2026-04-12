import { CgMenuLeftAlt } from "react-icons/cg";

import useOutsideClick from "../hook/useOutsideCllick";
import DropDownMenu from "./DropDownMenu";

function ButtonMenu() {
  const { openModal, handleModalClose } = useOutsideClick();
  return (
    <>
      <button onClick={handleModalClose} className="cursor-pointer lg:hidden">
        <CgMenuLeftAlt className="w-8 h-8 sm:w-7 sm:h-7 text-orange-500/90" />
      </button>
      {openModal && (
        <DropDownMenu
          openModal={openModal}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
}

export default ButtonMenu;
