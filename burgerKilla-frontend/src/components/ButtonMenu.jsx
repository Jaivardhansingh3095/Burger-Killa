import { CiMenuFries } from 'react-icons/ci';
import useOutsideClick from '../hook/useOutsideCllick';
import DropDownMenu from './DropDownMenu';

function ButtonMenu() {
  const { openModal, handleModalClose } = useOutsideClick();
  return (
    <>
      <button onClick={handleModalClose} className="cursor-pointer lg:hidden">
        <CiMenuFries className="w-6 h-6 sm:w-7 sm:h-7" />
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
